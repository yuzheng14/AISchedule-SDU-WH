/**
 * 山东大学（威海）小爱同学课程表parser函数
 */
var count = -1;

function scheduleHtmlParser(html) {
    var $ = cheerio.load(html, {
        decodeEntities: false
    });
    let result = [];
    // 获取表格的每一个cell
    $('div.kbcontent').each(function () {
        // 记录节次
        count++
        // console.log(count)
        // 定义正则表达式
        let reg_name = /(?<=<br>)(?!([0-9]+)).*?(?=<br>)/
        let reg_week = /(?<=<font title="周次\(节次\)">).*?(?=<\/font>)/
        let reg_position = /(?<=<font title="教室">).*?(?=<\/font>)/
        let reg_teacher = /(?<=<font title="老师">).*?(?=<\/font>)/
        // 分割获取到的courses以匹配同一节课不同周数不同课的情况
        let courses = $(this).html().split("---------------------")
        for (let i = 0; i < courses.length; i++) {
            //正则匹配当前cell的课程名称
            let course_name = courses[i].match(reg_name)
            // 若当前cell匹配不到课程名称则直接跳过
            if (course_name != null) {
                // 取正则匹配到的结果数组的第0个
                course_name=course_name[0]
                // 正则匹配周数
                let course_week = courses[i].match(reg_week)[0]
                let week = []
                // 对周数进行判定添加上课周数
                if (course_week.indexOf('(双周)') != -1) {
                    let start = Number(course_week.slice(0, course_week.indexOf("-")))
                    let end = Number(course_week.slice(course_week.indexOf('-') + 1, course_week.indexOf('(双周)')))
                    if(start/2!=Math.floor(start/2)) start+1
                    for (let i = start; i <= end; i+=2) {
                        week.push(i)
                    }
                } else if (course_week.indexOf('(单周)') != -1) {
                    let start = Number(course_week.slice(0, course_week.indexOf("-")))
                    let end = Number(course_week.slice(course_week.indexOf('-') + 1, course_week.indexOf('(单周)')))
                    if(start/2==Math.floor(start/2)) start+1
                    for (let i = start; i <= end; i+=2) {
                        week.push(i)
                    }
                } else if (course_week.indexOf('-') != -1) {
                    let start = Number(course_week.slice(0, course_week.indexOf("-")))
                    let end = Number(course_week.slice(course_week.indexOf('-') + 1, course_week.indexOf('(周)')))
                    for (let i = start; i <= end; i++) {
                        week.push(i)
                    }
                } else {
                    course_week=course_week.slice(0, course_week.indexOf('(周)'))
                    segmentation_week = course_week.split(',')
                    for (let i = 0; i < segmentation_week.length; i++) {
                        week.push(segmentation_week[i])
                    }
                }
                // console.log(typeof(course_name))
                // modify_name = JSON.stringify(course_name)
                // modify_name = modify_name.slice(2, modify_name.length - 2)
                // 判断是否存在上课老师和地点并进行赋值
                // 若不存在上课地点则赋空字符串
                let course_position=courses[i].match(reg_position)
                if(course_position!=null) course_position=courses[i].match(reg_position)[0]
                else course_position=""
                let course_teacher=courses[i].match(reg_teacher)
                if(course_teacher!=null) course_teacher=courses[i].match(reg_teacher)[0]
                // 组装数据
                let course = {
                    name: course_name,
                    position: course_position,
                    teacher: course_teacher,
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
                // 若当前课不为空则log当前课
                if (courses[i] != null) console.log(course)
                // push当前课
                result.push(course)
            }
        }

    })
    // return数据
    return {
        courseInfos: result
    }
}