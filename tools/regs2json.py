import sys, json, re, glob, os
import xml.etree.ElementTree as ET
src=sys.argv[1]; out=sys.argv[2]
res={}
for f in sorted(glob.glob(os.path.join(src,'*.xml'))):
    root=ET.parse(f).getroot()
    sec=root.get('N')
    head=''.join(root.find('HEAD').itertext()).strip()
    paras=[]
    for el in root.iter():
        if el.tag in ('P','FP'):
            t=re.sub(r'\s+',' ',''.join(el.itertext())).strip()
            if t: paras.append(t)
    res[sec]={'head':head,'paras':paras}
json.dump(res,open(out,'w'),indent=1)
for k,v in res.items(): print(k, v['head'], len(' '.join(v['paras'])))
