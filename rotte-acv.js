/* STANDARD ROUTES ACV — le rotte standard dell'Aeroclub Varese.

   Generato da tools/rotte-acv.mjs a partire dai NavLog ForeFlight in
   data/rotte-acv/: non si modifica a mano. Ogni rotta e' il NavLog letto dallo
   stesso parser della pagina di import, quindi sceglierla e' come caricare quel
   file. Tempi e carburante di ForeFlight restano solo come riferimento
   nell'anteprima: il foglio di volo li ricalcola con il settaggio di potenza.

   tng: l'aeroporto dove la rotta prevede un Touch & Go, che il foglio di volo
   trova gia' spuntato. */
window.ROTTE_ACV = [
 { "id": "limz-tng", "nome": "LIMZ Touch and Go", "tng": "LIMZ", "fonte": "ForeFlight NavLog, Oct 2026", "nav": { "legs": [
    { "wpt": "LILN", "full": "LILN", "mh": null, "dist": null, "ete": null, "fuel": null, "alt": null, "gs": null },
    { "wpt": "MALNATE", "full": "MALNATE (LNN1) (LILN)", "mh": 352, "dist": 3, "ete": 3, "fuel": 2.2, "alt": null, "gs": null },
    { "wpt": "ARONA", "full": "ARONA", "mh": 256, "dist": 14, "ete": 8, "fuel": 5.4, "alt": null, "gs": null },
    { "wpt": "ROMAGNANO", "full": "ROMAGNANO (MCW2) (LIMC)", "mh": 221, "dist": 11, "ete": 6, "fuel": 3.2, "alt": null, "gs": null },
    { "wpt": "SANTHIA", "full": "SANTHIA", "mh": 205, "dist": 18, "ete": 10, "fuel": 5.6, "alt": null, "gs": null },
    { "wpt": "TOP", "full": "TOP", "mh": 202, "dist": 30, "ete": 15, "fuel": 8.8, "alt": null, "gs": null },
    { "wpt": "BRA", "full": "BRA (MZNE1) (LIMZ)", "mh": 176, "dist": 14, "ete": 7, "fuel": 4.1, "alt": null, "gs": null },
    { "wpt": "SOUTH FOSSANO", "full": "SOUTH FOSSANO (MZE1) (LIMZ)", "mh": 210, "dist": 12, "ete": 6, "fuel": 3.5, "alt": null, "gs": null },
    { "wpt": "LIMZ", "full": "LIMZ", "mh": 284, "dist": 3, "ete": 2, "fuel": 1, "alt": null, "gs": null },
    { "wpt": "RACCONIGI", "full": "RACCONIGI (MZN1) (LIMZ)", "mh": 10, "dist": 12, "ete": 7, "fuel": 3.9, "alt": null, "gs": null },
    { "wpt": "ASTI", "full": "ASTI", "mh": 62, "dist": 24, "ete": 14, "fuel": 8.1, "alt": null, "gs": null },
    { "wpt": "VOG", "full": "VOG", "mh": 77, "dist": 33, "ete": 19, "fuel": 11.2, "alt": null, "gs": null },
    { "wpt": "SRN", "full": "SRN", "mh": 3, "dist": 41, "ete": 22, "fuel": 12.9, "alt": null, "gs": null },
    { "wpt": "MOZZATE", "full": "MOZZATE (LNS1) (LILN)", "mh": 301, "dist": 4, "ete": 2, "fuel": 1.3, "alt": null, "gs": null },
    { "wpt": "LILN", "full": "LILN", "mh": 318, "dist": 4, "ete": 2, "fuel": 1.5, "alt": null, "gs": null } ], "totals": { "dist": 223, "ete": 123, "fuel": 80.2, "fromTotals": true }, "dep": "LILN", "arr": "LILN", "route": "MALNATE ARONA ROMAGNANO SANTHIA TOP BRA SOUTH FOSSANO LIMZ RACCONIGI ASTI VOG SRN MOZZATE", "avgGs": null, "cruiseAlt": null, "fuelUnit": "l", "fuelLitres": 80.2, "roundTrip": true } }
];
