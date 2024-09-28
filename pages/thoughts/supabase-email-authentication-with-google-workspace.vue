<template>
  <main class="w-three-quarters page-top">
    <section class="article-extras">
      <SectionTitle title="Supabase email authentication with Google Workspace" />
      <Share route="/thoughts/neurodiversity-as-software-incompatibility" topic="Neurodiversity as software incompatibility" />
      <AllPosts />
    </section>
    <section class="content">
      <section class="summary">
        <h3>TLDR Summary</h3>

        <ol>
          <li>Use SMTP Host: smtp-relay.gmail.com</li>
          <li>Use SMTP Port: 465</li>
          <li>Have 2fa enabled</li>
          <li>Generate and use an app password</li>
          <li>Use your admin account to authenticate with the above</li>
        </ol>
      </section>

      <p>I generally use Supabase to build with. I like that they provide excellent, accessible Postgres deployments plus authentication for just about every flavor that you can think of. It's the end of September 2024, and they have announced some changes to what is allowed with regards to sending emails via their platform. Basically, they are requiring everyone to use their own SMTP relays instead of Supabase's. I suppose that's reasonable.</p>

      <p>For <a href="https://vewrite.com/">Vewrite</a>, a technical writing project management service that I've been building, I have set up my deployment on Netlify, and rely on Google Workspace for our org's email, shared drives, and internal docs. There is a support email which I'd like to use for Vewrite, and I suppose it makes sense to rely on Google's outgoing SMTP relay for Supabase, too.</p>

      <p>It was a bit finicky to set up and I ran into a couple of gotchas before getting it all to work correctly. In the name of <strong>**science!**</strong>, I'm sharing how to set this up below.</p>

      <p>You'll need to have:</p>

      <ul>
        <li>A <a href="https://supabase.com/">Supabase</a> account</li>
        <li>A <a href="https://workspace.google.com/">Google Workspace</a> account</li>
      </ul>

      <h3>Google Workspace Account</h3>

      <p>For the Google account, you'll be managing the account settings via the Google Security section of your account. After you've signed in, you can access this from the dropdown that is in the top-right on a Google-related page (like Gmail, etc.), then "Manage your Google Account", and finally the Security tab on the left nav bar.</p>

      <img src="/labs/google-security.png" alt="Google Security" />

      <p>You'll need to have a few things set up:</p>

      <ul>
        <li>Access to the Google Admin Console</li>
        <li>2fa enabled for the admin account</li>
        <li>A generated Google app password for Supabase</li>
      </ul>

      <p>For the first one, if you're the administrator, you're good to go. If not, you'll have to work with them to gain access.</p>

      <p>For 2fa, you must set this up. I highly recommend doing so with Google Authenticator. Just to be super clear: this step is not optional. You will not be able to generate app passwords without this. Setting up 2fa is done via the Security tab. Scroll down until you see "2-step verification".</p>

      <p>Lastly, you'll need to generate an app password. For whatever strange reason, this option is no longer exposed for me, but is available via the search bar. Type in "app password" in the search bar if you can't find it in the security panel.</p>

      <img src="/labs/app-password.png" alt="Google App Password Generator" />

      <p>Once you click on the app passwords option in the search bar, you'll be asked to reauthenticate, and then passed on to the generation section. Simply give it a name, and copy the password somewhere locally. You'll need this for Supabase.</p>

      <h3>Supabase Setup</h3>

      <p>For the Supabase account, you'll be managing the outgoing emails via the Auth Settings page. Supabase has decent docs, and you can <a href="https://supabase.com/docs/guides/auth/auth-smtp">see what we're going to be working with here</a>.</p>

      <p>If you're already in your Supabase project, go to "Project Settings", and then "Authentication", within the "Configuration" section. Then, scroll down to "SMTP Provider Settings".</p>

      <p>To get everything working, you'll need to set up the Google's SMTP relay in Supabase. You'll need to have the following information:</p>

      <ul>
        <li>SMTP Host: smtp-relay.gmail.com</li>
        <li>SMTP Port: 465</li>
        <li>SMTP Username for the admin account (it's an email address)</li>
        <li>Generated google app password</li>
      </ul>

      <img src="/labs/supabase-setup.png" alt="Supabase SMTP Auth Setup" />

      <p>Fill in the fields, and you should be good to go. You can test the connection by sending a test email from the Supabase dashboard.</p>

      <p>That's it! You should be all set up to send emails from Supabase via Google's SMTP relay.</p>

    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<style lang="scss" scoped>

@import './assets/variables';

#example {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(0deg, #36C883, #1E7C4F);

  .special-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    color: $white !important;
    font-size: $font-size-max;
    line-height: 100%;
    font-weight: 900;

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
    }
  }
}

</style>