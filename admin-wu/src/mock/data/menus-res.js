export default [
    {
        "id": 13,
        "parentId": -1,
        "children": [
            {
                "id": 4,
                "parentId": 13,
                "children": [
                    {
                        "id": 22,
                        "parentId": 4,
                        "children": [],
                        "title": "ECU管理",
                        "href": "/programgmt/ecumgmt",
                        "spread": false,
                        "path": "/adminSys/projectManager/ecuManager",
                        "code": "ecuManager"
                    },
                    {
                        "id": 23,
                        "parentId": 4,
                        "children": [],
                        "title": "项目配置",
                        "href": "/programgmt/projectconf/index",
                        "spread": false,
                        "path": "/adminSys/projectManager/projectConfig",
                        "code": "projectConfig"
                    },
                    {
                        "id": 24,
                        "parentId": 4,
                        "children": [],
                        "title": "车辆管理",
                        "href": "/programgmt/carmgmt/index",
                        "spread": false,
                        "path": "/adminSys/projectManager/carManager",
                        "code": "carManager"
                    },
                    {
                        "id": 121,
                        "parentId": 4,
                        "children": [],
                        "title": "OTA配置",
                        "href": "admin/systemConfig",
                        "spread": false,
                        "path": "/adminSys/projectManager/systemConfig",
                        "code": "systemConfig"
                    }
                ],
                "icon": "icon-project",
                "title": "配置管理",
                "href": "/programgmt",
                "spread": false,
                "path": "/adminSys/projectManager",
                "code": "projectManager"
            },
            {
                "id": 5,
                "parentId": 13,
                "children": [
                    {
                        "id": 1,
                        "parentId": 5,
                        "children": [],
                        "icon": "fa-user",
                        "title": "用户管理",
                        "href": "/admin/user",
                        "spread": false,
                        "path": "/adminSys/baseManager/userManager",
                        "code": "userManager"
                    },
                    {
                        "id": 7,
                        "parentId": 5,
                        "children": [],
                        "icon": "group_fill",
                        "title": "角色权限管理",
                        "href": "/admin/group",
                        "spread": false,
                        "path": "/adminSys/baseManager/groupManager",
                        "code": "groupManager"
                    },
                    {
                        "id": 8,
                        "parentId": 5,
                        "children": [],
                        "icon": "fa-users",
                        "title": "角色类型管理",
                        "href": "/admin/groupType",
                        "spread": false,
                        "path": "/adminSys/baseManager/groupTypeManager",
                        "code": "groupTypeManager"
                    }
                ],
                "icon": "setting",
                "title": "基础配置管理",
                "href": "/admin",
                "spread": false,
                "path": "/adminSys/baseManager",
                "code": "baseManager"
            },
            {
                "id": 9,
                "parentId": 13,
                "children": [
                    {
                        "id": 10,
                        "parentId": 9,
                        "children": [],
                        "title": "升级管理",
                        "href": "/otaupdate/updateManage",
                        "spread": false,
                        "path": "/adminSys/upgradeManager/updateManage",
                        "code": "updateManage"
                    },
                    {
                        "id": 25,
                        "parentId": 9,
                        "children": [],
                        "title": "升级监控",
                        "href": "/otaupdate/updateMonitor/index",
                        "spread": false,
                        "path": "/adminSys/upgradeManager/upgradeMonitor",
                        "code": "upgradeMonitor"
                    },
                    {
                        "id": 161,
                        "parentId": 9,
                        "children": [],
                        "title": "升级配置",
                        "href": "/campmgmt/upgradeconf",
                        "spread": false,
                        "path": "/adminSys/upgradeManager/upgradeConfig",
                        "code": "upgradeConfig"
                    },
                    {
                        "id": 181,
                        "parentId": 9,
                        "children": [],
                        "title": "Camp.执行",
                        "href": "/campmgmt/execute",
                        "spread": false,
                        "path": "/adminSys/upgradeManager/campExecute",
                        "code": "campExecute"
                    }
                ],
                "icon": "tubiaozhizuomoban",
                "title": "Campaign管理",
                "href": "/campmgmt",
                "spread": false,
                "path": "/adminSys/upgradeManager",
                "code": "upgradeManager"
            },
            {
                "id": 26,
                "parentId": 13,
                "children": [
                    {
                        "id": 28,
                        "parentId": 26,
                        "children": [],
                        "title": "升级审核",
                        "href": "/otaverify/otaupverify",
                        "spread": false,
                        "path": "/adminSys/otaverify/upgradeVerifier",
                        "code": "upgradeVerifier"
                    }
                ],
                "icon": "OTAshenhe",
                "title": "OTA审核",
                "href": "/otaverify",
                "spread": false,
                "path": "/adminSys/otaverify",
                "code": "otaverify"
            },
            {
                "id": 29,
                "parentId": 13,
                "children": [
                    {
                        "id": 30,
                        "parentId": 29,
                        "children": [],
                        "title": "版本统计",
                        "href": "/datastats/versionstats",
                        "spread": false,
                        "path": "/adminSys/dataStatistics/versionStatistics",
                        "code": "versionStatistics"
                    },
                    {
                        "id": 31,
                        "parentId": 29,
                        "children": [],
                        "title": "车辆详情",
                        "href": "/datastats/carsDetail/index",
                        "spread": false,
                        "path": "/adminSys/dataStatistics/carDetailed",
                        "code": "carDetailed"
                    }
                ],
                "icon": "shuju",
                "title": "数据统计",
                "href": "/datastats",
                "spread": false,
                "path": "/adminSys/dataStatistics",
                "code": "dataStatistics"
            },
            {
                "id": 32,
                "parentId": 13,
                "children": [
                    {
                        "id": 33,
                        "parentId": 32,
                        "children": [],
                        "title": "平台日志",
                        "href": "/logmanage/platformlog",
                        "spread": false,
                        "path": "/adminSys/logManager/platformLog",
                        "code": "platformLog"
                    },
                    {
                        "id": 34,
                        "parentId": 32,
                        "children": [],
                        "title": "车辆日志",
                        "href": "logmanage/carslog",
                        "spread": false,
                        "path": "/adminSys/logManager/carLog",
                        "code": "carLog"
                    },
                    {
                        "id": 221,
                        "parentId": 32,
                        "children": [],
                        "title": "接口日志",
                        "href": "/logmanage/portlog",
                        "spread": false,
                        "path": "/adminSys/logManager//votaweb/logmanage/portlog",
                        "code": "portlog"
                    }
                ],
                "icon": "rizhiguanli",
                "title": "日志管理",
                "href": "/logmanage",
                "spread": false,
                "path": "/adminSys/logManager",
                "code": "logManager"
            },
            {
                "id": 201,
                "parentId": 13,
                "children": [
                    {
                        "id": 202,
                        "parentId": 201,
                        "children": [],
                        "title": "测试车辆",
                        "href": "/testmgmt/testvehicle",
                        "spread": false,
                        "path": "/adminSys/testManager/testvehicle",
                        "code": "testvehicle"
                    },
                    {
                        "id": 203,
                        "parentId": 201,
                        "children": [],
                        "title": "测试任务",
                        "href": "/testmgmt/testTask",
                        "spread": false,
                        "path": "/adminSys/testManager/testTask",
                        "code": "testTask"
                    }
                ],
                "icon": "ceshiguanli",
                "title": "测试管理",
                "href": "/testmgmt",
                "spread": false,
                "path": "/adminSys/testManager",
                "code": "testManager"
            }
        ],
        "icon": "setting",
        "title": "权限管理系统",
        "href": "/base",
        "spread": false,
        "path": "/adminSys",
        "code": "adminSys"
    }

]
