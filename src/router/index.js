import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BaseInfo from "../views/BaseInfo";
import ProfileClass from "../views/ProfileClass";
import ProfileSensitive from "../views/ProfileSensitive";
import ProfileImpact from "../views/ProfileImpact";
import ProfileAffect from "../views/ProfileAffect";
import Staff from "../views/Staff";
import Product from "../views/Product";
import Task from "../views/Task";
import Style from "../views/Style";
import TaskEfficiency from "../views/TaskEfficiency";
import Simulator from "../views/Simulator";
import BackendUser from "../views/BackendUser";
import FrontendUser from "../views/FrontendUser";
import Action from "../views/Action";
import Environment from "../views/Environment";
import Template from "../views/Template";
import Model from "../views/Model";
import Package from "../views/Package";
import Drill from "../views/Drill";
import DrillConsole from "../views/DrillConsole";
import DrillControl from "../views/DrillControl";
import DrillOverview from "../views/DrillOverview";
import DrillCapable from "../views/DrillCapable";
import DrillEffective from "../views/DrillEffective";
import DrillCompare from "../views/DrillCompare";
import Agent from "../views/Agent";
import DrillHelp from "../helps/DrillHelp";
import InstructorHelp from "../helps/InstructorHelp";
import UserAdminHelp from "../helps/UserAdminHelp";
import CustomHelp from "../helps/CustomHelp";
import ConceptHelp from "../helps/ConceptHelp";
import i18n from "../i18n";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: `${i18n.locale}`,
  },
  {
    path: "/:lang",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "baseinfo",
        name: "BaseInfo",
        component: BaseInfo,
      },
      {
        path: "profileclass",
        name: "ProfileClass",
        component: ProfileClass,
      },
      {
        path: "profilesensitive",
        name: "ProfileSensitive",
        component: ProfileSensitive,
      },
      {
        path: "profileimpact",
        name: "ProfileImpact",
        component: ProfileImpact,
      },
      {
        path: "profileaffect",
        name: "ProfileAffect",
        component: ProfileAffect,
      },
      {
        path: "staff",
        name: "Staff",
        component: Staff,
      },
      {
        path: "product",
        name: "Product",
        component: Product,
      },
      {
        path: "task",
        name: "Task",
        component: Task,
      },
      {
        path: "style",
        name: "Style",
        component: Style,
      },
      {
        path: "taskefficiency",
        name: "TaskEfficiency",
        component: TaskEfficiency,
      },
      {
        path: "simulator",
        name: "Simulator",
        component: Simulator,
      },
      {
        path: "backenduser",
        name: "BackendUser",
        component: BackendUser,
      },
      {
        path: "action",
        name: "Action",
        component: Action,
      },
      {
        path: "environment",
        name: "Environment",
        component: Environment,
      },
      {
        path: "template",
        name: "Template",
        component: Template,
      },
      {
        path: "model",
        name: "Model",
        component: Model,
      },
      {
        path: "package",
        name: "Package",
        component: Package,
      },
      {
        path: "frontenduser",
        name: "FrontendUser",
        component: FrontendUser,
      },
      {
        path: "drill",
        name: "Drill",
        component: Drill,
      },
      {
        path: "drillconsole",
        name: "DrillConsole",
        component: DrillConsole,
      },
      {
        path: "drillcontrol",
        name: "DrillControl",
        component: DrillControl,
      },
      {
        path: "drilloverview",
        name: "DrillOverview",
        component: DrillOverview,
      },
      {
        path: "drillCapable",
        name: "DrillCapable",
        component: DrillCapable,
      },
      {
        path: "drillEffective",
        name: "DrillEffective",
        component: DrillEffective,
      },
      {
        path: "drillcompare",
        name: "DrillCompare",
        component: DrillCompare,
      },
      {
        path: "agent",
        name: "Agent",
        component: Agent,
      },
      {
        path: "drillhelp",
        name: "DrillHelp",
        component: DrillHelp,
      },
      {
        path: "instructorhelp",
        name: "InstructorHelp",
        component: InstructorHelp,
      },
      {
        path: "useradminhelp",
        name: "UserAdminHelp",
        component: UserAdminHelp,
      },
      {
        path: "customhelp",
        name: "CustomHelp",
        component: CustomHelp,
      },
      {
        path: "concepthelp",
        name: "ConceptHelp",
        component: ConceptHelp,
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
