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
          { path: '/user/register/teacher', component: '@/pages/user/account/UserRegisterTeacher' },
          { path: '/user/verify/email/:userId/:hash', component: '@/pages/user/account/UserEmailVerify' },
        ],
      },

      {
        path: '/',
        component: '@/layout/GeneralLayout',
        routes: [
          { path: '/profile/:userId', component: '@/pages/user/profile/UserProfile' },

          { path: '/teacherImageUpload', component: '@/pages/user/profile/profileList/teacherImageUpload/TeacherImageUpload' },
          { path: '/teacherContact', component: '@/pages/user/profile/profileList/TeacherContact' },
          { path: '/teacherDescription', component: '@/pages/user/profile/profileList/TeacherDescription' },
          { path: '/teacherFacebook', component: '@/pages/user/profile/profileList/TeacherFacebook' },
          { path: '/teacherInstagram', component: '@/pages/user/profile/profileList/TeacherInstagram' },
          { path: '/teacherLocation', component: '@/pages/user/profile/profileList/TeacherLocation' },
          { path: '/teacherResetPassword', component: '@/pages/user/profile/profileList/TeacherResetPassword' },
          { path: '/teacherYogaStyle', component: '@/pages/user/profile/profileList/teacherYogaStyle/TeacherYogaStyle' },
          { path: '/teacherYouTube', component: '@/pages/user/profile/profileList/TeacherYouTube' },




          { path: '/base', component: '@/pages/base/dashboard/BaseDashboard' },
          { path: '/base/:baseId', component: '@/pages/base/view/BaseView' },
          { path: '/vendor', component: '@/pages/vendor/dashboard/VendorDashboard' },
          { path: '/vendor/:vendorId', component: '@/pages/vendor/view/VendorView' },
          { path: '/vendorType', component: '@/pages/vendorType/dashboard/VendorTypeDashboard' },
          { path: '/vendorType/:vendorTypeId', component: '@/pages/vendorType/view/VendorTypeView' },

          // *****  ====================================
          { path: '/users', component: '@/pages/user/userSearch/UsersDashboard' },
          { path: '/contact', component: '@/pages/pages/ContactUsPage' },
          { path: '/pricing', component: '@/pages/pages/PricingPage' },
          { path: '/industries', component: '@/pages/pages/IndustriesPage' },
          { path: '/support', component: '@/pages/pages/supportPage/Support' },
          { path: '/faq', component: '@/pages/pages/Faq' },
          { path: '/subscribe', component: '@/pages/pages/Subscribe' },
          {
            path: '/settings/:userId',
            component: '@/layout/UserSettingsLayout',
            routes: [
              {
                path: '/settings/:userId',
                redirect: '/settings/companyAccount/:userId',
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
