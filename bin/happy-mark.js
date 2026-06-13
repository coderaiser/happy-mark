#!/usr/bin/env node

import process from 'node:process';
import {readStdin} from 'redstd';
import {convertMarkdownToJs} from '#happy-mark';

const markdown = await readStdin();
process.stdout.write(convertMarkdownToJs(markdown));

