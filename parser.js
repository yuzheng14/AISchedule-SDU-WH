/**
 * 山东大学（威海）小爱同学课程表parser函数
 */
var count = -1;

function scheduleHtmlParser(html) {
    var $ = cheerio.load(html, {
        decodeEntities: false
    });
    let result = [];
    $('div.kbcontent').each(function () {
        // 记录节次
        count++
        console.log(count)
        let reg = /(?<=<br>)[\u4e00-\u9fa5]*?(?=<br>)/
        let courses = $(this).html().split("---------------------")
        for (let i = 0; i < courses.length; i++) {
            origin_name = courses[i].match(reg)
            if (origin_name != null) {
                let origin_week = $(this).find("font[title='周次(节次)']").html()
                let week = []
                if (origin_week.indexOf('-') != -1) {
                    let start = Number(origin_week.slice(0, origin_week.indexOf("-")))
                    let end = Number(origin_week.slice(origin_week.indexOf('-') + 1, origin_week.indexOf('(周)')))
                    for (let i = start; i <= end; i++) {
                        week.push(i)
                    }
                } else {
                    //ToDo: 非范围周数
                    origin_week.slice(0, origin_week.indexOf('(周)'))
                    segmentation_week = origin_week.split(',')
                    for (let i = 0; i < segmentation_week.length; i++) {
                        week.push(segmentation_week[i])
                    }
                }
                // console.log(typeof(origin_name))
                modify_name = JSON.stringify(origin_name)
                modify_name = modify_name.slice(2, modify_name.length - 2)
                let course = {
                    name: modify_name,
                    position: $(this).find("font[title='教室']").html(),
                    teacher: $(this).find("font[title='老师']").html(),
                    weeks: week,
                    day: count % 7 + 1,
                    sections: [{
                            'section': Math.floor(count / 7 + 1) * 2 - 1
                        },
                        {
                            'section': Math.floor(count / 7 + 1) * 2
                        }
                    ]
                }
                console.log(course)
                result.push(course)
            }
        }

    })
    return {
        courseInfos: result
    }
}