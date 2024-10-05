import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ReactPlayer from 'react-player';

type ProjectCardProps = {
  href: string;
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];  // Change this line
  image?: string;
  video?: string;
  links?: readonly {  // Change this line
    readonly type: string;
    readonly href: string;
    readonly icon: React.ReactNode;
  }[];
};

export function ProjectCard({
  href,
  title,
  description,
  dates,
  tags,
  image,
  video,
  links,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {video && (
          <div className="relative aspect-video overflow-hidden">
            <ReactPlayer
              url={video}
              width="100%"
              height="100%"
              controls
              playing={false}
              muted
              config={{
                file: {
                  forceHLS: true,
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
            />
          </div>
        )}
        {!video && image && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </a>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">{dates}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {links && links.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex gap-4">
              {links.map((link) => (
                <a
                  key={link.type}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-sm font-medium flex items-center hover:underline",
                    link.type === "Website"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {link.icon}
                  <span className="ml-1">{link.type}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
