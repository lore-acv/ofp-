# 6-18: la riga 2 del problema di carico in I-CCAB dice "- Full oil may be assumed / for all flights"
# (I-CCAF: "The weight of full oil may be used / for all calculations"); letta sulla scansione e con Tesseract
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sostituisci import sostituisci
sostituisci('6-18', [(571, '479-1243', 'Oil: 10 Qts. (9,5 Litres) The weight of full oil may be used', 'Oil: 10 Qts. (9,5 Litres) - Full oil may be assumed'),
                     (606, '479-708', 'for all calculations', 'for all flights')])
