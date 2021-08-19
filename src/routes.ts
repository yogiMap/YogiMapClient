export default [
  {
    path: '/email',
    component: '@/pages/email/dashboard/EmailDashboard',
  },

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
          { path: '/welcome', component: '@/pages/infoPages/home/NewUserLanding' },

          { path: '/wizard', component: '@/pages/teacherAccount/wizard/Wizard' },
          {
            path: '/wizardStudentAccount',
            component: '@/pages/studentAccount/wizardStudentAccount/WizardStudentAccount',
          },

          { path: '/profile/:userId', component: '@/pages/user/profile/UserProfile' },

          { path: '/base', component: '@/pages/base/dashboard/BaseDashboard' },
          { path: '/base/:baseId', component: '@/pages/base/view/BaseView' },

          { path: '/teacherAccount', component: '@/pages/teacherAccount/dashboard/TeacherAccountDashboard' },

          { path: '/studentAccount', component: '@/pages/studentAccount/dashboard/StudentAccountDashboard' },
          { path: '/studentAccount/:studentAccountId', component: '@/pages/studentAccount/view/StudentAccountView' },

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

          { path: '/schedule', component: '@/pages/schedule/ScheduleDashboard' },

          { path: '/telephony', component: '@/pages/telephony/dashboard/SipPhoneDashboard' },
          { path: '/telephony/:sipPhoneId', component: '@/pages/telephony/view/SipPhoneView' },

          { path: '/payment', component: '@/pages/payment/dashboard/PaymentDashboard' },
          { path: '/payment/:paymentId', component: '@/pages/payment/view/PaymentView' },
          // TEACHER ACCOUNT ====================================

          {
            path: '/teacherAccount/:teacherAccountId',
            component: '@/layout/TeacherAccountLayout',
            routes: [
              {
                path: '/teacherAccount/:teacherAccountId',
                component: '@/pages/teacherAccount/view/TeacherAccountView',
              },
              {
                path: '/teacherAccount/:teacherAccountId/telephony',
                component: '@/pages/teacherAccount/telephony/TeacherAccountSipPhone',
              },
              {
                path: '/teacherAccount/:teacherAccountId/classes',
                component: '@/pages/classes/dashboard/ClassesDashboard',
              },
              {
                path: '/teacherAccount/:teacherAccountId/classes/byId',
                component: '@/pages/teacherAccount/view/TeacherAccountViewClassesList',
              },
              {
                path: '/teacherAccount/:teacherAccountId/event',
                component: '@/pages/event/dashboard/EventDashboard',
              },
              {
                path: '/client/:clientId',
                redirect: '/client/:clientId/info',
              },
            ],
          },

          // CLIENT ====================================
          { path: '/client', component: '@/pages/client/dashboard/ClientDashboard' },
          {
            path: '/client/:clientId',
            component: '@/layout/ClientLayout',
            routes: [
              {
                path: '/client/:clientId',
                redirect: '/client/:clientId/info',
              },
              {
                path: '/client/:clientId/info',
                component: '@/pages/client/info/ClientInfo',
              },
              {
                path: '/client/:clientId/messages',
                component: '@/layout/ClientMessagesLayout',
                routes: [
                  {
                    path: '/client/:clientId/messages',
                    redirect: '/client/:clientId/messages/phone',
                  },
                  {
                    path: '/client/:clientId/messages/phone',
                    component: '@/pages/client/messages/ClientMessagesPhone',
                  },
                  {
                    path: '/client/:clientId/messages/viber',
                    component: '@/pages/client/messages/ClientMessagesViber',
                  },
                ],
              },
            ],
          },

          // *****  ====================================
          { path: '/users', component: '@/pages/user/userSearch/UsersDashboard' },
          { path: '/contact', component: '@/pages/infoPages/ContactUsPage' },
          { path: '/styles', component: '@/pages/infoPages/YogaStylesGuide' },
          { path: '/type', component: '@/pages/infoPages/ClassTypeGuide' },
          { path: '/library', component: '@/pages/infoPages/Library' },
          { path: '/faq', component: '@/pages/infoPages/Faq' },
          { path: '/contact', component: '@/pages/infoPages/ContactUsPage' },
          { path: '/sitemap', component: '@/pages/infoPages/SiteMap' },
          { path: '/subscribe', component: '@/pages/infoPages/Subscribe' },

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
                path: '/settings/studentAccount/:userId',
                component: '@/pages/user/settings/studentAccount/StudentAccountSettingsView',
              },
              {
                path: '/settings/profile/:userId',
                component: '@/pages/user/settings/profile/UserSettingsEditProfileWrapper',
              },
              {
                path: '/settings/security/:userId',
                component: '@/pages/user/settings/security/UserSettingsEditSecurityWrapper',
              },
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

          { path: '/', component: '@/pages/infoPages/home/Home' },
        ],
      },
    ],
  },
];
