# Local Variables:
# mode: makefile
# End:
# vim: set ft=make :

server:
  yarn start

dev:
  tmux new-session -s CV 'just server' \; split-window -h 'yarn watch:css'

pdf:
  yarn run build:pdf
