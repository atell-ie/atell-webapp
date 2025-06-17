# /bin/usr/env bash

HEAD_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo
echo -e "\e[33mYou are about to merge \"$HEAD_BRANCH\" and push to all branches\e[39m"
read -p "Are you sure? " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  for branch in "dev" "qa" "staging"; do
    git checkout $branch
    git merge $HEAD_BRANCH -m "merge: $HEAD_BRANCH"
    git push
  done
fi

git checkout $HEAD_BRANCH

exit 0
