'use client';

import { useState } from "react";
import * as motion from "motion/react-client";
import Fab from "@mui/material/Fab";
import { ChartNoAxesGantt, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { NewsOrganisation } from "@/lib/interfaces/news/news-organisation";
import { NewsOrganisationCard } from "./news-organisation-card";

interface NewsOrganisationsMobileDrawerProps {
  organisations: NewsOrganisation[];
}

export function NewsOrganisationsDrawer({ organisations }: NewsOrganisationsMobileDrawerProps) {
  const [fabOpen, setFabOpen] = useState(false);

  if (organisations.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-30 xl:hidden">
        <Fab
          onClick={() => setFabOpen(!fabOpen)}
          sx={{
            backgroundColor: "oklch(0.645 0.246 16.439)",
            color: "oklch(0.969 0.015 12.422)",
            "&:hover": {
              backgroundColor: "oklch(0.6 0.23 16.439)",
            },
          }}
        >
          {fabOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ChartNoAxesGantt />
            </motion.div>
          )}
        </Fab>
      </div>

      <Drawer open={fabOpen} onOpenChange={setFabOpen}>
        <DrawerContent className="xl:hidden">
          <DrawerHeader>
            <DrawerTitle>Student Organisations</DrawerTitle>
            <DrawerDescription>Browse recent news by organisation</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[60vh] space-y-2 overflow-y-auto px-4 pb-4">
            {organisations.map((organisation) => (
              <div key={organisation.id} onClick={() => setFabOpen(false)}>
                <NewsOrganisationCard organisation={organisation} />
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="rounded-lg bg-muted px-4 py-2 transition-colors hover:bg-muted/80">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
