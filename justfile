# Local Variables:
# mode: makefile
# End:
# vim: set ft=make :

server:
  npm start

dev:
  tmux new-session -s CV 'just server' \; split-window -h 'npm run watch:css'

pdf:
  npm run build:pdf
