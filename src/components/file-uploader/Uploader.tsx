"use client";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import RenderEmptyState, {
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function Uploader({ value, onChange }: iAppProps) {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    key: value,
    isDeleting: false,
    error: false,
    objectUrl: undefined,
    fileType: "image",
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      // 1) get presigned url from api
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: file.type.includes("image"),
        }),
      });

      console.log("presignedResponse", presignedResponse);

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          error: true,
          uploading: false,
          progress: 0,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      // 2) upload file to s3
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // when our file is uploading
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };

        // once our file is finished uploading
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));

            // we call the onChange function to update the value
            onChange?.(key);

            toast.success("File uploaded successfully");
            resolve(true);
          } else {
            reject(new Error("Failed to upload file"));
          }
        };

        // if there is an error
        xhr.onerror = () => {
          reject(new Error("Failed to upload file"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setFileState((prev) => ({
        ...prev,
        error: true,
        uploading: false,
        progress: 0,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          id: uuidv4(),
          file: file,
          uploading: false,
          progress: 0,
          key: value,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
          fileType: file.type.includes("image") ? "image" : "video",
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl]
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: fileState.key }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file");

        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      });

      toast.success("File deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("error removing file, please try again");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  function rejectedFiles(files: FileRejection[]) {
    if (files.length) {
      const tooManyFiles = files.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const tooLargeFiles = files.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("too many files selected, max is 1");
      }

      if (tooLargeFiles) {
        toast.error("file too large, max is 5MB");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFiles,
    disabled:
      fileState.uploading || fileState.isDeleting || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full p-4">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
