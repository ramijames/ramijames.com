<template>
  <PageHeader title="On Using iCloud Drive for Storage" />
  <main class="w-content page-top">
    <section class="content">
      <img src="/articles/time-machine.png" />

      <p>iCloud is a good way to replicate your files remotes so that, in the case of a catastrophe, you will not have complete data loss. It allows you to:</p>
      <ul>
        <li>Set specific folders or applications to store remotely  </li>
        <li>Automatically download those file when you need access to them</li>
      </ul>
      <p>There are multiple parallel services like Dropbox and Google Drive. If you're on a Mac, it makes sense to go with iCloud for its deep integration into the MacOS operating system.</p>
      
      <h3 id="-what-icloud-doesn-t-do-">What iCloud doesn’t do</h3>
      <p>iCloud is not perfect and is not a 100% guarantee that your files are safe. Shit always has the potential to happen.</p>
      <p>You should ALSO be using local backups with MacOS’ backup solution and an SSD. I <a href="https://amzn.to/4hwr1GA">recommend these Samsung SSDs</a> as they have a long shelf-life, good storage capacity, and a reasonable price. I have two and I intermittently swap between them just in case something happens. It’s better to be paranoid than to lose your data.</p>
      <p>You can do this by going to MacOS Settings and searching for “Time Machine”. There is a little “+” button which will allow you to add a backup disk. I just leave mine plugged in all the time and it does rolling backups of any changes on my computer.</p>

      <h3 id="-answering-specific-questions-">Answering Specific Questions</h3>
      <h4>Can I safely delete important files from my computer to free up storage space if I put them in iCloud?</h4>
      <p>You don’t need to if you have selected to use “Optimize Mac Storage” (see below). It will intelligently decide which files to store locally and which to store remotely. Do not delete your files as that will be reflected in your remote copy, too. Just let iCloud handle it for you.</p>
      
      <h4>How is the storage on iCloud related to my storage on my iMac which is only a fraction of the 2 Terabytes on the basic offer?</h4>
      <p>iCloud checks when the last time you accessed a file was. If it was a long time ago, it assumes that you don’t really need a local copy of it and it creates what is typically called a symlink to the remote file. When you double-click the file, it goes and reads that remote file, and then downloads it for your use. </p>

      <p>Your local storage will show only the files which are downloaded locally. To view your remote storage space, you should go to “iCloud” in your MacOS settings. There is a bar on the top that shows your status (see below).</p>
      
      <h4>Is the advantage of iCloud over an external hard drive that you can access the files remotely?</h4>
      
      <p>There are a couple of advantages to using iCloud over an external hard drive, but I should underscore that they are not really the same thing. Having remote backups gives you a duplicate of your current file system’s state and does not reflect the history of your files. That’s what Time Machine does, and this should be done with local backup drives (see above for a drive recommendation).</p>

      <p>The advantage of iCloud is remote replication in the case of a catastrophe like a house fire or flood which destroys all local copies. Additionally it allows you to offload storage onto a remote drive so that you can free up space locally. As I indicate below, you should allow MacOS to do this automatically for you.</p>
      
      <h3 id="-setting-up-icloud-drive-">Setting up iCloud Drive</h3>
      <p>iCloud is similarly easy to set up. You go into MacOS settings and search for “iCloud”. Selecting it will bring up a display showing its status.</p>
      <p>There are really only a handful of settings here that are worth discussing.</p>
      <h4 id="-icloud-bar-">iCloud+ bar</h4>

      <img src="/articles/icloud.png" />

      <p>This shows you how much of your storage you’ve used. As you can see, there’s plenty of space here to grow. </p>
      <h4 id="-account-storage-and-the-manage-button-">Account Storage and the “Manage Button”</h4>
      <p>This gives you access to your iCloud plan. I’m using the 2tb plan because I don’t think that I’ll ever need to store more than that. It’s a ton of data. The things that are most important to me are my work files and my photos and those are all replicated onto iCloud.</p>
      <p>You can manage exactly what gets saved from here. Mostly, I think that the default settings are pretty solid, and I recommend that you leave those as is.</p>

      <img src="/articles/account-storage.png" />

      <p>If you find that you need more space, there are bigger options.</p>
      <h4 id="-optimize-mac-storage-">Optimize Mac Storage</h4>
      <p>Lastly, there is Optimize Mac Storage which is a tricky way of saying that they will not store files locally if they aren’t accessed often.</p>
      <p>I’m really of two minds about this feature. On the one hand, it’s nice that for the most part it does a good job of optimizing which files are instantly available at any given time. On the other, when you come across a big stack of files that you need right now and they are on iCloud and you have to download them and wait, it can be a pain.</p>
      <p>I personally leave this on and let iCloud do its thing. It’s pretty rare that it gets in my way and I have not experienced any data loss with it. With a similar feature on Dropbox, I once lost all of my files. YMMV.</p>
      <p>If you’re ultra-paranoid, turn this off and maintain a local copy of all of your files.</p>
      <h3 id="-managing-files-in-icloud-drive-">Managing files in iCloud Drive</h3>
      <p>If you’ve decided to go with iCloud Drive, it’s simply a matter of going to the “iCloud Drive” folder that is mounted in Finder and opening that. Anything in here will be replicated remotely onto Apple’s servers.</p>

      <img src="/articles/in-finder.png" />

      <p>If a file is local, it will simply show the file name. If it is remote, it will show a little cloud with a down arrow.</p>

      <img src="/articles/download-now.png" />

      <p>Files that show the little cloud icon no longer take up space on your computer.</p>

      <img src="/articles/downloading.png" />

      <h3>Conclusion</h3>
      <p>I hope that someone out there found this helpful. It was originally written for my father-in-law, who is a sweet man.</p>
      <ArticleAddendum />
    </section>
  </main>
  <Footer />
</template>

<script setup>

useHead({
  title: () => "On Using iCloud Drive for Storage"
})

useSeoMeta({
  title:  "On Using iCloud Drive for Storage",
  ogTitle:  "On Using iCloud Drive for Storage",
  description: "iCloud is a good way to replicate your files remotes so that, in the case of a catastrophe, you will not have complete data loss. For Mac users it has great integration and I recommend using it.",
  ogDescription: "iCloud is a good way to replicate your files remotes so that, in the case of a catastrophe, you will not have complete data loss. For Mac users it has great integration and I recommend using it.",
  ogImage: "/articles/using-icloud.png",
  url: 'https://www.ramijames.com/thoughts/on-using-icloud-drive-for-storage',
  twitterTitle:  "On Using iCloud Drive for Storage",
  twitterDescription: "iCloud is a good way to replicate your files remotes so that, in the case of a catastrophe, you will not have complete data loss. For Mac users it has great integration and I recommend using it.",
  twitterImage: "/articles/using-icloud.png",
  twitterCard: 'summary_large_image',
})

</script>