import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'login-1',
        path: `${AUTH_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
    },
    {
        key: 'login-2',
        path: `${AUTH_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
    },
    {
        key: 'register-1',
        path: `${AUTH_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
    },
    {
        key: 'register-2',
        path: `${AUTH_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'error-page-1',
        path: `${AUTH_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${AUTH_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    }, 
    {
        key: 'dashboard.startup',
        path: `${APP_PREFIX_PATH}/dashboards/default/startup`,
        component: React.lazy(() => import('views/app-views/dashboards/default/startup/startupList')),
    },
    {
        key: 'dashboard.startup.create',
        path: `${APP_PREFIX_PATH}/dashboards/startup/create`,
        component: React.lazy(() => import('views/app-views/dashboards/default/startup/createStartup')),
    }, {
        key: 'dashboard.startup.edit',
        path: `${APP_PREFIX_PATH}/dashboards/startup/edit/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/default/startup/editStartup')),
    },
    {
        key: 'dashboard.flow',
        path: `${APP_PREFIX_PATH}/dashboards/default/flow`,
        component: React.lazy(() => import('views/app-views/dashboards/default/flow/flowList')),
    },
    
    {
        key: 'dashboard.flow.create',
        path: `${APP_PREFIX_PATH}/dashboards/flow/create`,
        component: React.lazy(() => import('views/app-views/dashboards/default/flow/createFlow')),
    }, {
        key: 'dashboard.flow.edit',
        path: `${APP_PREFIX_PATH}/dashboards/flow/edit/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/default/flow/editFlow')),
    },
      {
    key: 'dashboard.flow.question',
    path: `${APP_PREFIX_PATH}/dashboards/flow/question/:flowId`,
        component: React.lazy(() => import('views/app-views/dashboards/default/flow/question')),
},

    {
        key: 'dashboard.question.create',
        path: `${APP_PREFIX_PATH}/dashboards/question/create/:flowId`,
        component: React.lazy(() => import('views/app-views/dashboards/default/question/createQuestion')),
    }, {
        key: 'dashboard.question.edit',
        path: `${APP_PREFIX_PATH}/dashboards/question/edit/:flowId/:questionId`,
        component: React.lazy(() => import('views/app-views/dashboards/default/question/editQuestion')),
    },
  

    {
        key: 'dashboard.questionnaire',
        path: `${APP_PREFIX_PATH}/dashboards/default/questionnaire`,
        component: React.lazy(() => import('views/app-views/dashboards/default/questionnaire/questionFlow')),
    },

    {
        key: 'dashboard.questionnaire.answers',
        path: `${APP_PREFIX_PATH}/dashboards/default/questionnaire/answers`,
        component: React.lazy(() => import('views/app-views/dashboards/default/questionnaire/AnswerList')),
      },
      {
        key: 'dashboard.questionnaire.answerDetail',
        path: `${APP_PREFIX_PATH}/dashboards/default/questionnaire/answers/:answerId`,
        component: React.lazy(() => import('views/app-views/dashboards/default/questionnaire/AnswerDetail')),
      },

    {
        key: 'login-1',
        path: `${APP_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'login-2',
        path: `${APP_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register-1',
        path: `${APP_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register-2',
        path: `${APP_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'forgot-password',
        path: `${APP_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'error-page-1',
        path: `${APP_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'error-page-2',
        path: `${APP_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
        meta: {
            blankLayout: true
        }
    },
    
    
]