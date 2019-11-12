/**
 * 中央事件总线EventBus,用于通信。
 * 在Vue中可以使用 EventBus 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件
 */

import Vue from 'vue'
export const EventBus = new Vue();