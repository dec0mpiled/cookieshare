{"filter":false,"title":"index.js","tooltip":"/routes/index.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":12,"column":5},"end":{"row":12,"column":6},"action":"remove","lines":["*"],"id":92}],[{"start":{"row":12,"column":4},"end":{"row":12,"column":5},"action":"remove","lines":["/"],"id":93}],[{"start":{"row":15,"column":9},"end":{"row":15,"column":10},"action":"remove","lines":["/"],"id":94}],[{"start":{"row":15,"column":8},"end":{"row":15,"column":9},"action":"remove","lines":["*"],"id":95}],[{"start":{"row":13,"column":18},"end":{"row":13,"column":57},"action":"remove","lines":[" {$push: {following:\"ShareCookieAds\"} }"],"id":96}],[{"start":{"row":13,"column":18},"end":{"row":13,"column":19},"action":"insert","lines":[" "],"id":97}],[{"start":{"row":13,"column":19},"end":{"row":13,"column":20},"action":"insert","lines":["s"],"id":98}],[{"start":{"row":13,"column":20},"end":{"row":13,"column":21},"action":"insert","lines":["t"],"id":99}],[{"start":{"row":13,"column":21},"end":{"row":13,"column":22},"action":"insert","lines":["a"],"id":100}],[{"start":{"row":13,"column":22},"end":{"row":13,"column":23},"action":"insert","lines":["t"],"id":101}],[{"start":{"row":13,"column":23},"end":{"row":13,"column":24},"action":"insert","lines":["u"],"id":102}],[{"start":{"row":13,"column":24},"end":{"row":13,"column":25},"action":"insert","lines":["s"],"id":103}],[{"start":{"row":13,"column":25},"end":{"row":13,"column":26},"action":"insert","lines":[":"],"id":104}],[{"start":{"row":13,"column":26},"end":{"row":13,"column":28},"action":"insert","lines":["\"\""],"id":105}],[{"start":{"row":13,"column":27},"end":{"row":13,"column":28},"action":"insert","lines":["n"],"id":106}],[{"start":{"row":13,"column":28},"end":{"row":13,"column":29},"action":"insert","lines":["o"],"id":107}],[{"start":{"row":13,"column":29},"end":{"row":13,"column":30},"action":"insert","lines":["n"],"id":108}],[{"start":{"row":13,"column":30},"end":{"row":13,"column":31},"action":"insert","lines":["e"],"id":109}],[{"start":{"row":13,"column":25},"end":{"row":13,"column":26},"action":"remove","lines":[":"],"id":110}],[{"start":{"row":13,"column":25},"end":{"row":13,"column":26},"action":"insert","lines":["="],"id":111}],[{"start":{"row":13,"column":25},"end":{"row":13,"column":26},"action":"remove","lines":["="],"id":112}],[{"start":{"row":13,"column":25},"end":{"row":13,"column":26},"action":"insert","lines":[":"],"id":113}],[{"start":{"row":13,"column":19},"end":{"row":13,"column":20},"action":"insert","lines":["{"],"id":114}],[{"start":{"row":13,"column":33},"end":{"row":13,"column":34},"action":"insert","lines":["}"],"id":115}],[{"start":{"row":12,"column":4},"end":{"row":12,"column":5},"action":"insert","lines":["/"],"id":116}],[{"start":{"row":12,"column":5},"end":{"row":12,"column":6},"action":"insert","lines":["*"],"id":117}],[{"start":{"row":15,"column":8},"end":{"row":15,"column":9},"action":"insert","lines":["*"],"id":118}],[{"start":{"row":15,"column":9},"end":{"row":15,"column":10},"action":"insert","lines":["/"],"id":119}],[{"start":{"row":556,"column":3},"end":{"row":557,"column":0},"action":"insert","lines":["",""],"id":120}],[{"start":{"row":557,"column":0},"end":{"row":558,"column":0},"action":"insert","lines":["",""],"id":121}],[{"start":{"row":558,"column":0},"end":{"row":564,"column":3},"action":"insert","lines":["/* do some fucking awesome shit bitches #4!!!! */","router.post('/update/bio/:id', function(req, res, next) {","    User.findOneAndUpdate({ _id: req.params.id }, { bio: req.body.bio }, function(err, doc) {","        if (err) throw err;","    });","    res.redirect('/settings');","});"],"id":122}],[{"start":{"row":559,"column":14},"end":{"row":559,"column":24},"action":"remove","lines":["update/bio"],"id":123},{"start":{"row":559,"column":14},"end":{"row":559,"column":15},"action":"insert","lines":["d"]}],[{"start":{"row":559,"column":15},"end":{"row":559,"column":16},"action":"insert","lines":["e"],"id":124}],[{"start":{"row":559,"column":16},"end":{"row":559,"column":17},"action":"insert","lines":["l"],"id":125}],[{"start":{"row":559,"column":17},"end":{"row":559,"column":18},"action":"insert","lines":["e"],"id":126}],[{"start":{"row":559,"column":18},"end":{"row":559,"column":19},"action":"insert","lines":["t"],"id":127}],[{"start":{"row":559,"column":19},"end":{"row":559,"column":20},"action":"insert","lines":["e"],"id":128}],[{"start":{"row":559,"column":20},"end":{"row":559,"column":21},"action":"insert","lines":["m"],"id":129}],[{"start":{"row":559,"column":21},"end":{"row":559,"column":22},"action":"insert","lines":["e"],"id":130}],[{"start":{"row":560,"column":19},"end":{"row":560,"column":25},"action":"remove","lines":["Update"],"id":131},{"start":{"row":560,"column":19},"end":{"row":560,"column":20},"action":"insert","lines":["T"]}],[{"start":{"row":560,"column":19},"end":{"row":560,"column":20},"action":"remove","lines":["T"],"id":132}],[{"start":{"row":560,"column":19},"end":{"row":560,"column":20},"action":"insert","lines":["R"],"id":133}],[{"start":{"row":560,"column":20},"end":{"row":560,"column":21},"action":"insert","lines":["e"],"id":134}],[{"start":{"row":560,"column":21},"end":{"row":560,"column":22},"action":"insert","lines":["m"],"id":135}],[{"start":{"row":560,"column":22},"end":{"row":560,"column":23},"action":"insert","lines":["o"],"id":136}],[{"start":{"row":560,"column":23},"end":{"row":560,"column":24},"action":"insert","lines":["v"],"id":137}],[{"start":{"row":560,"column":24},"end":{"row":560,"column":25},"action":"insert","lines":["e"],"id":138}],[{"start":{"row":560,"column":49},"end":{"row":560,"column":73},"action":"remove","lines":[" { bio: req.body.bio }, "],"id":139}],[{"start":{"row":560,"column":49},"end":{"row":560,"column":50},"action":"insert","lines":[" "],"id":140}],[{"start":{"row":560,"column":66},"end":{"row":560,"column":67},"action":"remove","lines":["c"],"id":141}],[{"start":{"row":560,"column":65},"end":{"row":560,"column":66},"action":"remove","lines":["o"],"id":142}],[{"start":{"row":560,"column":64},"end":{"row":560,"column":65},"action":"remove","lines":["d"],"id":143}],[{"start":{"row":560,"column":64},"end":{"row":560,"column":65},"action":"insert","lines":["p"],"id":144}],[{"start":{"row":560,"column":65},"end":{"row":560,"column":66},"action":"insert","lines":["o"],"id":145}],[{"start":{"row":560,"column":66},"end":{"row":560,"column":67},"action":"insert","lines":["s"],"id":146}],[{"start":{"row":560,"column":67},"end":{"row":560,"column":68},"action":"insert","lines":["r"],"id":147}],[{"start":{"row":560,"column":67},"end":{"row":560,"column":68},"action":"remove","lines":["r"],"id":148}],[{"start":{"row":560,"column":67},"end":{"row":560,"column":68},"action":"insert","lines":["t"],"id":149}],[{"start":{"row":561,"column":26},"end":{"row":561,"column":27},"action":"remove","lines":[";"],"id":150}],[{"start":{"row":561,"column":25},"end":{"row":561,"column":26},"action":"remove","lines":["r"],"id":151}],[{"start":{"row":561,"column":24},"end":{"row":561,"column":25},"action":"remove","lines":["r"],"id":152}],[{"start":{"row":561,"column":23},"end":{"row":561,"column":24},"action":"remove","lines":["e"],"id":153}],[{"start":{"row":561,"column":22},"end":{"row":561,"column":23},"action":"remove","lines":[" "],"id":154}],[{"start":{"row":561,"column":21},"end":{"row":561,"column":22},"action":"remove","lines":["w"],"id":155}],[{"start":{"row":561,"column":20},"end":{"row":561,"column":21},"action":"remove","lines":["o"],"id":156}],[{"start":{"row":561,"column":19},"end":{"row":561,"column":20},"action":"remove","lines":["r"],"id":157}],[{"start":{"row":561,"column":18},"end":{"row":561,"column":19},"action":"remove","lines":["h"],"id":158}],[{"start":{"row":561,"column":17},"end":{"row":561,"column":18},"action":"remove","lines":["t"],"id":159}],[{"start":{"row":561,"column":17},"end":{"row":561,"column":18},"action":"insert","lines":["r"],"id":160}],[{"start":{"row":561,"column":18},"end":{"row":561,"column":19},"action":"insert","lines":["e"],"id":161}],[{"start":{"row":561,"column":19},"end":{"row":561,"column":20},"action":"insert","lines":["t"],"id":162}],[{"start":{"row":561,"column":20},"end":{"row":561,"column":21},"action":"insert","lines":["u"],"id":163}],[{"start":{"row":561,"column":21},"end":{"row":561,"column":22},"action":"insert","lines":["r"],"id":164}],[{"start":{"row":561,"column":22},"end":{"row":561,"column":23},"action":"insert","lines":["n"],"id":165}],[{"start":{"row":561,"column":23},"end":{"row":561,"column":24},"action":"insert","lines":[" "],"id":166}],[{"start":{"row":561,"column":24},"end":{"row":561,"column":25},"action":"insert","lines":["n"],"id":167}],[{"start":{"row":561,"column":25},"end":{"row":561,"column":26},"action":"insert","lines":["e"],"id":168}],[{"start":{"row":561,"column":26},"end":{"row":561,"column":27},"action":"insert","lines":["x"],"id":169}],[{"start":{"row":561,"column":27},"end":{"row":561,"column":28},"action":"insert","lines":["t"],"id":170}],[{"start":{"row":561,"column":28},"end":{"row":561,"column":29},"action":"insert","lines":[" "],"id":171}],[{"start":{"row":561,"column":29},"end":{"row":561,"column":30},"action":"insert","lines":["e"],"id":172}],[{"start":{"row":561,"column":30},"end":{"row":561,"column":31},"action":"insert","lines":["r"],"id":173}],[{"start":{"row":561,"column":31},"end":{"row":561,"column":32},"action":"insert","lines":["r"],"id":174}],[{"start":{"row":561,"column":32},"end":{"row":561,"column":33},"action":"insert","lines":[";"],"id":175}],[{"start":{"row":563,"column":19},"end":{"row":563,"column":27},"action":"remove","lines":["settings"],"id":176},{"start":{"row":563,"column":19},"end":{"row":563,"column":20},"action":"insert","lines":["h"]}],[{"start":{"row":563,"column":20},"end":{"row":563,"column":21},"action":"insert","lines":["o"],"id":177}],[{"start":{"row":563,"column":21},"end":{"row":563,"column":22},"action":"insert","lines":["m"],"id":178}],[{"start":{"row":563,"column":22},"end":{"row":563,"column":23},"action":"insert","lines":["e"],"id":179}],[{"start":{"row":563,"column":22},"end":{"row":563,"column":23},"action":"remove","lines":["e"],"id":180}],[{"start":{"row":563,"column":21},"end":{"row":563,"column":22},"action":"remove","lines":["m"],"id":181}],[{"start":{"row":563,"column":20},"end":{"row":563,"column":21},"action":"remove","lines":["o"],"id":182}],[{"start":{"row":563,"column":19},"end":{"row":563,"column":20},"action":"remove","lines":["h"],"id":183}],[{"start":{"row":561,"column":29},"end":{"row":561,"column":30},"action":"insert","lines":["("],"id":184}],[{"start":{"row":561,"column":33},"end":{"row":561,"column":34},"action":"insert","lines":[")"],"id":185}],[{"start":{"row":559,"column":10},"end":{"row":559,"column":11},"action":"remove","lines":["t"],"id":186}],[{"start":{"row":559,"column":9},"end":{"row":559,"column":10},"action":"remove","lines":["s"],"id":187}],[{"start":{"row":559,"column":8},"end":{"row":559,"column":9},"action":"remove","lines":["o"],"id":188}],[{"start":{"row":559,"column":7},"end":{"row":559,"column":8},"action":"remove","lines":["p"],"id":189}],[{"start":{"row":559,"column":7},"end":{"row":559,"column":8},"action":"insert","lines":["g"],"id":190}],[{"start":{"row":559,"column":8},"end":{"row":559,"column":9},"action":"insert","lines":["e"],"id":191}],[{"start":{"row":559,"column":9},"end":{"row":559,"column":10},"action":"insert","lines":["t"],"id":192}]]},"ace":{"folds":[],"scrolltop":8014,"scrollleft":0,"selection":{"start":{"row":559,"column":10},"end":{"row":559,"column":10},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":533,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1456191164728,"hash":"abeffaa14ddf13c9293c95d41b2da0f5111c3051"}