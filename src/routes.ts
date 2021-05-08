export default [
  {
    path: '/',
    component: '@/layout/SecurityLayout',

    routes: [
      // USER
      {
        path: '/user',
        component: '@/layout/LoginLayout',
        routes: [
          { path: '/user/password/reset/request', component: '@/pages/user/account/UserPasswordReset' },
          { path: '/user/password/reset/mailed', component: '@/pages/user/account/UserPasswordResetMailed' },
          { path: '/user/password/reset/:userId/:hash', component: '@/pages/user/account/UserPasswordResetNew' },
          { path: '/user/login', component: '@/pages/user/account/UserLogin' },
          { path: '/user/register', component: '@/pages/user/account/UserRegister' },
          { path: '/user/verify/email/:userId/:hash', component: '@/pages/user/account/UserEmailVerify' },
        ],
      },

      {
        path: '/',
        component: '@/layout/GeneralLayout',
        routes: [
          { path: '/profile/:userId', component: '@/pages/user/profile/UserProfile' },

          { path: '/base', component: '@/pages/base/dashboard/BaseDashboard' },
          { path: '/base/:baseId', component: '@/pages/base/view/BaseView' },

          { path: '/teacherAccount', component: '@/pages/teacherAccount/dashboard/TeacherAccountDashboard' },
          { path: '/teacherAccount/:teacherAccountId', component: '@/pages/teacherAccount/view/TeacherAccountView' },

          // { path: '/teacher', component: '@/pages/teacher/dashboard/TeacherDashboard' },
          // { path: '/teacher/:teacherId', component: '@/pages/teacher/view/TeacherView' },

          { path: '/classes', component: '@/pages/classes/dashboard/ClassesDashboard' },
          { path: '/classes/:classesId', component: '@/pages/classes/view/ClassesView' },

          { path: '/event', component: '@/pages/event/dashboard/EventDashboard' },
          { path: '/event/:eventId', component: '@/pages/event/view/EventView' },

          { path: '/classType', component: '@/pages/classType/dashboard/ClassTypeDashboard' },
          { path: '/classType/:classTypeId', component: '@/pages/classType/view/ClassTypeView' },

          { path: '/style', component: '@/pages/style/dashboard/StyleDashboard' },
          { path: '/style/:styleId', component: '@/pages/style/view/StyleView' },

          { path: '/list/focus', component: '@/pages/focus/dashboard/FocusDashboard' },
          { path: '/focus/:focusId', component: '@/pages/focus/view/FocusView' },

          // *****  ====================================
          { path: '/users', component: '@/pages/user/userSearch/UsersDashboard' },
          { path: '/contact', component: '@/pages/pages/ContactUsPage' },
          { path: '/styles', component: '@/pages/pages/YogaStylesGuide' },
          // { path: '/type', component: '@/pages/pages/classTypeGuide' },
          { path: '/library', component: '@/pages/pages/Library' },
          { path: '/faq', component: '@/pages/pages/Faq' },
          { path: '/contact', component: '@/pages/pages/ContactUsPage' },
          { path: '/sitemap', component: '@/pages/pages/SiteMap' },
          { path: '/subscribe', component: '@/pages/pages/Subscribe' },
          {
            path: '/settings/:userId',
            component: '@/layout/UserSettingsLayout',
            routes: [
              {
                path: '/settings/:userId',
                redirect: '/settings/teacherAccount/:userId',
              },
              {
                path: '/settings/profile/:userId',
                component: '@/pages/user/settings/profile/UserSettingsEditProfileWrapper',
              },
              {
                path: '/settings/teacherAccount/:userId',
                component: '@/pages/user/settings/teacherAccount/TeacherAccountSettingsView',
              },
              {
                path: '/settings/profile/:userId',
                component: '@/pages/user/settings/profile/UserSettingsEditProfileWrapper',
              },
              {
                path: '/settings/security/:userId',
                component: '@/pages/user/settings/security/UserSettingsEditSecurityWrapper',
              },
              // {
              //   path: '/settings/teacher/:userId',
              //   component: '@/pages/teacher/form/TeacherCreateWrapper',
              // },
              {
                path: '/settings/classes/:userId',
                component: '@/pages/classes/form/ClassesFormCreateWrapper',
              },
              {
                path: '/settings/event/:userId',
                component: '@/pages/event/form/EventFormCreateWrapper',
              },
              {
                path: '/settings/emails/:userId',
                component: '@/pages/user/settings/emails/UserSettingsEditEmailsWrapper',
              },
              {
                path: '/settings/links/:userId',
                component: '@/pages/user/settings/links/UserSettingsEditLinksWrapper',
              },
            ],
          },

          { path: '/', component: '@/pages/pages/homePage/HomePage' },
        ],
      },
    ],
  },
];
