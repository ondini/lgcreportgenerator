# LGC Report generator

### Description

Javascript source code for LGC Report generator, using React.js. The input is JSON file.

### Roadmap

3D part

- ! 2D plot (views per axis)
- ! tooltip: they don't care about xyz, they care about name
- ! highlight all the point lines measuring the point on hover
- !! error ellipsoid of confidence
- !!! maybe counter of observations per point like SurveyPad to tooltip (or hue)
- !!! color code per type (DIST, TSTN, PLR3D), if we have fully constrained put the solid color, if not put the dashed (maybe circle if sitance, horizontal angle triangle, etc. )
- !!! DX DY DZ, put it in the general 3D plot, add magnification factor since it might be not visible
- !!! Should all graphic stuff be in QGis or in LGC Report?

Histograms:

- ! Normalize all residueals values by SIGMA (=RES/SIG col), and plot it in separate histogram
- !! gaussian curve -> the data are in res file, center of gaussian is result, and the span is in ECART-TYPE
- !! CTRL + CLICK on cell -> go to the first observations in input file (is useful mainly if there is only one obs in the cell)

Point Table:

- ! mark columns by categories
- !!!!! circle with direction

Observation Table:

- ! display only some columns by default, the others will be turned on with switcehs (they need to agree on what is displayed, most of it should be available though)
- ! to adding more types of observations, they mainly need ANGL ZEND DIST LEVELING(DLEV, DVER) ECHO PLR3D
- ! height and header data -> Tooltip ok, but with the link to LGC input file
- ! highlights -> RES/SIG over 3 should be highlighted
- ! we should mix all the same observation for type (like all TSTN should support all types in the same table)
- !! filter icon on the header (search field) (maybe add another header with filet icons)

General stuff:

- ! filter nuerical values
- ! add table resume de mesures
- ! put units everywhere it is possible
- ! remove f from fTSTN
- !! maybe lets add styling for the next user testing

Frames:

- ! one table with all frames with their parameters
- ! tree diagram of frames with transformation information on edges
