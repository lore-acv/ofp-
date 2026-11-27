# 5-9: VI a 15 m di I-CCAB (diverse da I-CCAF), lette sulla scansione e confermate da Tesseract e da kts x 1,852 / x 1,151
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sostituisci import sostituisci
W='530-681'
sostituisci('5-9', [(673,W,'109 km/h','114 km/h'),(710,W,'59 kts','62 kts'),(747,W,'68 MPH','71 MPH'),
                    (823,W,'101 km/h','106 km/h'),(858,W,'55 kts','57 kts'),(895,W,'63 MPH','66 MPH'),
                    (966,W,'93 km/h','98 km/h'),(1003,W,'50 kts','53 kts'),(1039,W,'58 MPH','61 MPH')])
