'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Project {
  href: string;
  title: string;
  description: string;
  dates: string;
  tags?: readonly string[]; // Make tags optional
  image?: string;
  video?: string;
  links?: readonly {
    readonly type: string;
    readonly href: string;
    readonly icon: React.ReactNode;
  }[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="overflow-hidden">
      <a href={project.href} target="_blank" rel="noopener noreferrer">
        {project.video && (
          <div className="relative aspect-video overflow-hidden">
            <ReactPlayer
              url={project.video}
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
        {!project.video && project.image && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </a>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="text-sm text-gray-500">{project.dates}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {project.links && project.links.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex gap-4">
              {project.links.map((link) => (
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
};

export default ProjectCard;
