#!/usr/bin/env python3
import zipfile
import xml.etree.ElementTree as ET
import sys
import json

path = sys.argv[1]
with zipfile.ZipFile(path) as z:
    root = ET.fromstring(z.read('word/document.xml'))

texts = []
for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    parts = []
    for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
        if t.text:
            parts.append(t.text)
    if parts:
        texts.append(''.join(parts))

print(json.dumps(texts, ensure_ascii=False))
