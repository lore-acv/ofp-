# correzioni della 5-8 dopo gemella.py: le velocità di stallo I-CCAB (flaps up e flaps 20°) sono diverse da I-CCAF.
# Valori letti sulla scansione I-CCAB e confermati dalle conversioni kts -> km/h (x1,852) e kts -> MPH (x1,151).
f='/home/user/ofp-/tools/afm-rec/afm-ccab/testi/5-8.txt'; s=open(f,encoding='utf-8').read()
CCAB={  # (base della riga, colonna): (vecchio, nuovo)
 ('912','737-894'):('98 km/h','103 km/h'), ('948','737-894'):('53 kts','56 kts'), ('985','737-894'):('61 MPH','64 MPH'),
 ('912','909-1067'):('101 km/h','106 km/h'), ('948','909-1067'):('55 kts','57 kts'), ('985','909-1067'):('63 MPH','66 MPH'),
 ('912','1080-1238'):('113 km/h','117 km/h'), ('948','1080-1238'):('61 kts','63 kts'), ('985','1080-1238'):('70 MPH','73 MPH'),
 ('912','1251-1408'):('138 km/h','145 km/h'), ('948','1251-1408'):('75 kts','78 kts'), ('985','1251-1408'):('86 MPH','90 MPH'),
 ('1067','737-894'):('89 km/h','93 km/h'), ('1103','737-894'):('48 kts','50 kts'), ('1141','737-894'):('55 MPH','58 MPH'),
 ('1067','909-1067'):('92 km/h','97 km/h'), ('1103','909-1067'):('50 kts','52 kts'), ('1141','909-1067'):('57 MPH','60 MPH'),
 ('1067','1080-1238'):('103 km/h','108 km/h'), ('1103','1080-1238'):('56 kts','58 kts'), ('1141','1080-1238'):('64 MPH','67 MPH'),
 ('1067','1251-1408'):('127 km/h','134 km/h'), ('1103','1251-1408'):('69 kts','72 kts'), ('1141','1251-1408'):('79 MPH','83 MPH'),
}
for (b,col),(v,n) in CCAB.items():
    fine=col.split('-')[1]
    a=f'{b} tabella {col} c=23.8 fine={fine} | {v}\n'
    assert s.count(a)==1,a; s=s.replace(a,a.replace(f'| {v}',f'| {n}'))
open(f,'w',encoding='utf-8').write(s)
