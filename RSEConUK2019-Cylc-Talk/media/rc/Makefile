.PHONY: all

rc_files=$(patsubst %.rc,%.html,$(wildcard *.rc))

all: $(rc_files)

%.html: %.rc
	resources/pygment $< \
		--lexer-file resources/cylc_lang.py \
		--lexer-class=CylcLexer \
		--theme 'autumn' > $@

clean:
	find -name '*.html' -delete
