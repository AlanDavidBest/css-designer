# Output deploy output to console (for jenkins)
set -x
cat ./deploy_staging.log

git checkout master
git pull origin master

# Parse version out of file
version=$(cat deploy_staging.log | awk '/staging/ {f=NR} f && NR==f+2 {print $3}' | sed -E 's/([[:alnum:]-]*[:])*([\d]*)/\2/g' | sort -u)'.0.0'

echo "Updating to version '$version'"

sed -i '/version/s/"version": "[0-9]*[.][0-9]*[.][0-9]*",/"version": "'$version'",/g' package.json

# # Update version, commit, tag and push to remote origin
git config --global user.name "Mr Jenkins"
git config --global user.email deployment@jenkins.net
git commit -am "Updated package.json to version '$version'"
git tag -a $version -m "Staging version '$version' lambda deployed"
git push origin --tags
git push origin master
