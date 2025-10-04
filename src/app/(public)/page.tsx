import { Badge } from "@/components/ui/badge";
import { BookOpenTextIcon } from "@/components/ui/BookOpenTextIcon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartNoAxesCombinedIcon } from "@/components/ui/ChartNoAxesCombinedIcon";
import { SwordsIcon } from "@/components/ui/SwordsIcon";
import { UsersIcon } from "@/components/ui/UsersIcon";
import Link from "next/link";

type AnimatedIconProps = {
  className?: string;
  size?: number;
};

type AnimatedIconComponent = React.ForwardRefExoticComponent<
  AnimatedIconProps &
    React.RefAttributes<{
      startAnimation: () => void;
      stopAnimation: () => void;
    }>
>;

type FeatureProps = {
  title: string;
  description: string;
  icon: AnimatedIconComponent;
};

const features: FeatureProps[] = [
  {
    title: "comprehensive course catalog",
    description:
      "Access to a wide range of courses across various subjects and skill levels.",
    icon: BookOpenTextIcon,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: SwordsIcon,
  },
  {
    title: "Progress Tracking",
    description:
      "Track your progress, set goals, and receive personalized feedback to help you achieve your learning objectives.",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    title: "Community Support",
    description:
      "Connect with other learners and educators to share knowledge, ask questions, and collaborate on projects.",
    icon: UsersIcon,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <Badge variant="outline">The Future Of Online Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
            Elevate Your Learning Experiience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl text-center">
            Discover a new way to learn with our modern, interactive learning
            managment system. Access hight-quality courses anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Link className={buttonVariants({ size: "lg" })} href="/courses">
              Explore Courses
            </Link>

            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="feature-icon mb-4">
                <feature.icon className="size-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
