#! LINUX|MAC USERS ONLY. I haven't tested it on Mac, so use with caution

#* To use these aliases, you need to manually load this file with "source ./aliases.sh"
#* or run aliasLoader.sh to add it to your current shell configurations,
#* so the aliases can Automatically loaded when opening the shell.

#* How to run aliasLoader.sh? E.g. bash ./aliasLoader.sh

#? Docker aliases
alias docb="docker build . -t stalwart95/teletalk-client-web"
alias docr="docker run -it -u 0 -p 3000:3000 stalwart95/teletalk-client-web"

#? Railway aliases
alias rwl="railway logs"
alias rwu="railway up"

#? npm aliases
alias nrb="npm run build"
alias nrcf="npm run check:format"
alias nrcl="npm run check:lint"
alias nrcs="npm run check:style"
alias sb="serve build"

#? yarn aliases
alias ya="yarn add"
alias yd="yarn dev"
alias ys="yarn start"
alias yy="yarn"
