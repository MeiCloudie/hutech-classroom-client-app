import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import ProfilePage from "../../features/profiles/ProfilePage";
import SettingPage from "../../features/users/SettingPage";
import HelpPage from "../../features/helps/HelpPage";
import LinkPage from "../../features/helps/LinkPage";
import ClassroomPage from "../../features/classrooms/list/ClassroomPage";
import ClassroomLayout from "../../features/classrooms/layout/ClassroomLayout";
import ClassroomEverybody from "../../features/classrooms/everybody/ClassroomEverybody";
import ExercisePage from "../../features/classrooms/exercises/list/ExercisePage";
import ExerciseDetails from "../../features/classrooms/exercises/details/ExerciseDetails";
import AnswerPage from "../../features/classrooms/exercises/answers/AnswerPage";
import AnswerDetails from "../../features/classrooms/exercises/answers/AnswerDetails";
import GroupPage from "../../features/classrooms/groups/list/GroupPage";
import GroupDetails from "../../features/classrooms/groups/details/GroupDetails";
import ProjectPage from "../../features/classrooms/groups/projects/list/ProjectPage";
import ProjectDetails from "../../features/classrooms/groups/projects/details/ProjectDetails";
import MissionPage from "../../features/classrooms/groups/projects/missions/list/MissionPage";
import MissionDetails from "../../features/classrooms/groups/projects/missions/details/MissionDetials";
import PostPage from "../../features/classrooms/posts/list/PostPage";
import PostDetails from "../../features/classrooms/posts/details/PostDetails";
import ClassroomDetails from "../../features/classrooms/details/ClassroomDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "profiles", element: <ProfilePage /> },
          { path: "settings", element: <SettingPage /> },
          { path: "helps", element: <HelpPage /> },
          { path: "links", element: <LinkPage /> },

          { path: "classrooms", element: <ClassroomPage /> },
          {
            path: "cr/:id",
            element: <ClassroomLayout />,
            children: [
              { path: "", element: <ClassroomDetails /> },
              { path: "everybody", element: <ClassroomEverybody /> },

              { path: "posts", element: <PostPage /> },
              { path: "po/:id", element: <PostDetails /> },

              { path: "exercises", element: <ExercisePage /> },
              {
                path: "ex/:id",
                children: [
                  { path: "", element: <ExerciseDetails /> },
                  {
                    path: "answers",
                    children: [
                      { path: "all", element: <AnswerPage /> },
                      { path: "student/:id", element: <AnswerDetails /> },
                    ],
                  },
                ],
              },

              { path: "groups", element: <GroupPage /> },
              {
                path: "gr/:id",
                children: [
                  { path: "", element: <GroupDetails /> },
                  { path: "projects-of-group", element: <ProjectPage /> },
                  {
                    path: "pj/:id",
                    children: [
                      { path: "", element: <ProjectDetails /> },
                      { path: "missions-of-group", element: <MissionPage /> },
                      { path: "ms/:id", element: <MissionDetails /> },
                    ],
                  },
                ],
              },
            ],
          },
          { path: "errors", element: <TestErrors /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
