param(
    [string]$fireBaseToken,
    [string]$fireBaseProject,
    [string]$releaseMessage
)

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

npm i -g firebase-tools
write-host "starting deploy...";
firebase --version;
firebase deploy --token $firebaseToken --project $firebaseProject --message "Release: $releaseMessage";
write-host "deployment completed";

Pop-Location