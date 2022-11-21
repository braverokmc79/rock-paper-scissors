
const winstonLog = require("./winston.log");
const parseurl = require('parseurl');


//로그 처리 및 결과값 반환처리
const logger = (response, req, res) => {
    const url = {
        method: req.method,
        path: parseurl(req).pathname,
        status: (response !== null ? response.err : false) ? 400 : 200,
    };

    if (response === null) {
        winstonLog.info(`${url.method} |  ${url.path} 화면 | Request Query : ${JSON.stringify(req.query)} `);
        return;
    }

    let result = false;

    if (response.err) {
        winstonLog.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} | Request Body : ${JSON.stringify(req.body)}  |  msg | ${response.err}`
        );

        result = true;
    } else {

        if (url.method === "GET") {
            winstonLog.info(`${url.method} |  ${url.path} 화면 | Request Query : ${JSON.stringify(req.query)}  |   msg | ${response.msg || ""}  `);

        } else {
            winstonLog.info(
                `${url.method} ${url.path} ${url.status} Response: ${response.success}  | Request Body : ${JSON.stringify(req.body)}  |   msg | ${response.msg || ""}`
            );
        }
        result = false;
    }

    if (result) return res.status(400).json({ msg: response.err.toString() });
    return res.status(200).json(response);
};


module.exports = logger;