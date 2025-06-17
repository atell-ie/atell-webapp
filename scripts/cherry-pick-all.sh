# /bin/usr/env bash

HEAD_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo
echo -e "\e[33mYou are about to cherry-pick \"$1\" and commit/push to all branches\e[39m"
read -p "Are you sure? " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  for branch in "dev" "qa" "staging"; do
    git checkout $branch
    git cherry-pick $1
    git push
  done
fi

git checkout $HEAD_BRANCH

exit 0
