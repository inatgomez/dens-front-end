import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import { createProject } from "@/services/projectService";

// Use Dialog component as wrapper for the form. Use newproject component as wrapper for the groupaction in sidebar.
// Use select component inside form to choose genres.

const CreateNewProject = React.forwardRef;
