<template>
  <ThoughtsHeader title="Quick Walkthrough on Using Supabase Migrations" slug="/thoughts/quick-walkthrough-using-supabase-migrations" />
  <PageHeader title="Quick Walkthrough on Using Supabase Migrations" />
  <main class="w-content page-top">
    <section class="content">

        <h2>Why use Supabase Migrations?</h2>
        <h3>Introduction</h3>
        <p>Supabase is a great way to off-load a lot of your DevOps onto an external provider. Out of the box, they give you a Postgres database, user authentication and management, logging and analytics, and a bunch of other useful tools. This allows you to focus on building critical feature sets, instead of having to also juggle setting up servers, manage updates, and all of that other stuff that is usually necessary as you scale from 0-10K users. I like not having to worry about that stuff too early.</p>
        <p>The service also provides a nice way to easily interact with your databases while you are iterating. It let's you quickly alter the structure of your db and check the state of the data as you work. It makes for really quick development and I appreciate that a lot. It's fast and loose, and feels comfortable.</p>
        <p>This is fine if you're just one person and you're not working on anything too serious. It's not good practice though because it isn't repeatable or scalable.</p>
        
        <h3>Benefits of Migrations</h3>
        <p>There are a many benefits to using migrations:</p>
        <ul>
          <li>Easy repeatability of changes</li>
          <li>Easy rollback of changes</li>
          <li>Easy to collaborate with a team</li>
          <li>Easy to deploy changes to production</li>
          <li>Version control</li>
        </ul>
        <p>A migration is simply a set of instructions that you feed through your application into your database that does things like creating tables, columns, and sometimes seeding with data for testing. Migrations mean that you can make a set of changes locally while in development, which after they are confirmed working, you can implement on your production database without a hitch (hopefully).</p>
        
        <p><a href="https://vewrite.com">Vewrite</a> has reached a state of maturity that requires a more standardized workflow, and migrations are being added so that working on it locally will be easier.</p>
        
        <h2>Working with Supabase Migrations</h2>
        <h3>Install the Supabase CLI</h3>

        <p>If you haven’t already installed the Supabase CLI, follow the installation instructions from the Supabase CLI documentation:</p>

        <pre>
# Using npm:
npm install -g supabase

# Or using Homebrew (on macOS):
brew install supabase/tap/supabase
        </pre>

        <p>Verify the installation with:</p>

        <pre>
supabase --version
        </pre>

        <h3>Initialize Your Supabase Project</h3>

        <p>If you haven’t initialized a Supabase project locally yet, run:</p>

        <pre>
supabase init
        </pre>

        <p>This creates a supabase directory in your project with the necessary configuration files.</p>
        
        <h3>Create a New Migration</h3>

        <p>To create a new migration, use the migration new command with a descriptive name:</p>

        <pre>
supabase migration new add_users_table
        </pre>

        <p>This command will create a new SQL file in the supabase/migrations directory with a timestamp prepended to the filename. It will then open the file in your default editor (if configured) or simply create the file for you to edit.</p>

        <h3>Edit the Migration SQL File</h3>

        <p>Open the newly created migration file (e.g., supabase/migrations/20250202T123456_add_users_table.sql) and add your SQL statements. For example, to create a new users table:</p>

        <pre>
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);
        </pre>

        <p>Note: Make sure to include both up and down migration logic if you plan on rolling back changes manually. However, by default, Supabase’s migration workflow focuses on forward migrations.</p>
        
        <h3>Apply (Run) the Migration</h3>

        <p>Once you’ve written your migration, run it with:</p>

        <pre>
supabase db push
        </pre>

        <p>This command will apply any pending migrations to your local database. If you’re working against your remote Supabase database, make sure you have your connection details configured correctly in your environment.</p>
        
        <h3>Version Control Your Migrations</h3>

        <p>Since migrations are just SQL files stored in your project, add them to your version control (e.g., Git) to keep track of database changes and collaborate with your team.</p>

        <h3>Rolling Out to Production</h3>

        <p>When you’re ready to deploy your changes:</p>

        <ul>
          <li>Ensure your production environment has the latest migration files.</li>
          <li>Run the migration command (similar to supabase db push) against your production database, or use your CI/CD pipeline to apply the migrations.</li>
        </ul>

        <h3>Additional Tips</h3>

        <ul>
            <li><a href="https://supabase.com/docs/guides/local-development/cli/getting-started">Review the Supabase CLI Docs</a>: There are other commands available (like supabase db reset, supabase start, etc.) that help manage your local development environment.</li>
            <li>Test Locally First: Always run your migrations locally before applying them to your production database.</li>
            <li>Backup: Ensure you have proper backups before running migrations on production systems.</li>
        </ul>

        <p>This should give you a quick start with creating and managing migrations using Supabase. Happy coding!</p>
    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<style lang="scss" scoped>
</style>

<script setup>

useHead({
  title: () => "Quick Walkthrough on Using Supabase Migrations"
})

useSeoMeta({
  title: "Quick Walkthrough on Using Supabase Migrations",
  ogTitle: "Quick Walkthrough on Using Supabase Migrations",
  description: "Migrations are the traditional way to manage the structure of your database. Supabase has a great way to manage migrations and we'll see how to use them in this article.",
  ogDescription: "Migrations are the traditional way to manage the structure of your database. Supabase has a great way to manage migrations and we'll see how to use them in this article.",
  ogImage: "/articles/supabase-migrations.png",
  url: 'https://www.ramijames.com/thoughts/',
  twitterTitle: "Quick Walkthrough on Using Supabase Migrations",
  twitterDescription:"Migrations are the traditional way to manage the structure of your database. Supabase has a great way to manage migrations and we'll see how to use them in this article.",
  twitterImage: "/articles/supabase-migrations.png",
  twitterCard: 'summary_large_image',
})

</script>