import authenticatorContainer from "../UniversalComponents/HeimdallChild/Container/authenticatorContainer";
import dashboardCont from "../Dashboard/Container/dashboardCont";
import documentCon from "../DocumentView/Container/documentCon";
import SearchCon from "../Search/Container/SearchCon";
// import uploadCon from "../Upload/Container/uploadCon";
import uploadCon from "../UploadFile/Container/uploadFileContainer";
import settingsCon from "../Settings/Container/settingsCon";
import projectCon from "../Project/Container/projectCon";
import susbscriptionsCon from "../Susbscriptions/Container/susbscriptionsCon";
import historyCon from "../History/Container/historyCon";
import introCon from "../IntroPage/Container/introCon";
import documentLibraryCon from "../DocumentLibrary/Container/documentLibraryCon";
import reportsCon from "../Reports/Container/reportsCon";
import taskManagementCon from "../TaskManagement/Container/taskManagementCon";
import clauseLibraryCon from "../ClauseLibrary/Container/clauseLibraryCon";
import newAnalysisCon from "../NewAnalysis/Container/newAnalysisContainer";
import newDashboardCon from "../NewDashboard/Container/newDashboardContainer";
import signInCon from "../Authentication/Container/signInCon";
import signUpCon from "../Authentication/Container/signUpCon";
import KeycloakRedirection from "../Keycloak/Pages/keycloak-redirection";
import TemplateCon from "../Templates/Container/templatesContainer";
import DraftContainer from "../Draft/Container/DraftContainer";

export interface RouteInterface {
	path: string;
	component: any;
	exact: boolean;
}

export const ROUTES: RouteInterface[] = [
	{
		path: "/",
		component: introCon,
		exact: true,
	},
	/* {
		path: '/dashboard',
		component: dashboardCont,
		exact: true
	}, */
	{
		path: "/dashboard",
		component: newDashboardCon,
		exact: true,
	},
	{
		path: "/uploads",
		component: historyCon,
		exact: true,
	},
	{
		path: "/addfiles",
		component: uploadCon,
		exact: true,
	},
	{
		path: "/settings",
		component: settingsCon,
		exact: true,
	},
	{
		path: "/project",
		component: projectCon,
		exact: true,
	},
	{
		path: "/subscriptions",
		component: susbscriptionsCon,
		exact: true,
	} /* 
    {
        path: '/analysis',
        component: analysisCon,
        exact: true
    }, */,
	{
		path: "/document/:page/:id/:requestid?",
		component: documentCon,
		exact: true,
	},
	{
		path: "/search/:query",
		component: SearchCon,
		exact: true,
	},
	{
		path: "/documentlibrary",
		component: documentLibraryCon,
		exact: true,
	},
	{
		path: "/reports",
		component: reportsCon,
		exact: true,
	},
	{
		path: "/tasks",
		component: taskManagementCon,
		exact: true,
	},
	{
		path: "/clauselibrary",
		component: clauseLibraryCon,
		exact: true,
	},
	{
		path: "/analysis",
		component: newAnalysisCon,
		exact: true,
	},
	{
		path: "/templates",
		component: TemplateCon,
		exact: true
	},
	{
		path: "/draftingreview",
		component: DraftContainer,
		exact: true
	}
];

export const FREEROUTES: RouteInterface[] = [
	{
		path: "/auth",
		component: authenticatorContainer,
		exact: true,
	},
	{
		path: "/login",
		component: signInCon,
		exact: true,
	},
];

export const STYLUSROUTES: RouteInterface[] = [
	{
		path: "/template",
		component: TemplateCon,
		exact: true,
	}
];
