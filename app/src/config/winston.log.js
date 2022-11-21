const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const { combine, timestamp, printf, colorize, label } = winston.format;

const logDir = "logs"; // logs 디렉토리 하위에 로그 파일 저장

const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});


const productionWinstonDail = [
    new winstonDaily({
        level: "warn",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/warn",
        filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
        maxFiles: 30, // 30일치 로그 파일 저장
        zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
        level: "error",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
    })
]

const devWinstonDail = [...productionWinstonDail];
devWinstonDail.push(    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
        level: "info",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/info",
        filename: `%DATE%.info.log`, // file 이름 날짜로 저장
        maxFiles: 30, // 30일치 로그 파일 저장
        zippedArchive: true,
    }));

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const winstonLog = winston.createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),

    transports: process.env.NODE_ENV !== "production" ? devWinstonDail : productionWinstonDail
});

winstonLog.stream = {
    // morgan wiston 설정
    write: (message) => {
        logger.info(message);
    },
};

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 
// 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (process.env.NODE_ENV !== "production") {
    winstonLog.add(
        // new winston.transports.Console({
        //     format: combine(
        //         colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        //         logFormat // log format 적용
        //     ),
        // });

        new winston.transports.Console({
            name: 'debug-console',
            colorize: true,
            level: "debug",
            format: combine(
                label({ label: '가위-바위-보 게임' }),
                colorize(),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                printf(
                    info => `${info.timestamp} | [${info.label}] | (${info.level}) :  ${info.message} `
                )
            ),
            showlevel: true,
            json: false,
        })
    );
}


module.exports = winstonLog;



