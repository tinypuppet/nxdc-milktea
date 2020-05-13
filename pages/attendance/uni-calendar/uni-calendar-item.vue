<template>
	<view class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--disable':weeks.disable,
		'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
		'uni-calendar-item--checked':(calendar.fullDate === weeks.fullDate && !weeks.isDay) ,
		'uni-calendar-item--multiple': weeks.multiple
		}"
	 @click="choiceDate(weeks)">
		<view class="uni-calendar-item__weeks-box-item">
			<view v-if="selected&&weeks.extraInfo" class="uni-calendar-item__weeks-box-selected">
				<view class="iconfont iconseleted"></view>
			</view>
			<template v-else>
				<text class="uni-calendar-item__weeks-box-text" :class="{
					'uni-calendar-item--isDay-text': weeks.isDay,
					'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable':weeks.disable,
					}">{{weeks.date}}</text>
				<text v-if="lunar&&!weeks.extraInfo" class="uni-calendar-item__weeks-lunar-text" :class="{
					'uni-calendar-item--isDay-text':weeks.isDay,
					'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable':weeks.disable,
					}">{{weeks.isDay?'今天': (weeks.lunar.IDayCn === '初一'?weeks.lunar.IMonthCn:weeks.lunar.IDayCn)}}</text>
				<text v-if="weeks.extraInfo&&weeks.extraInfo.info" class="uni-calendar-item__weeks-lunar-text" :class="{
					'uni-calendar-item--extra':weeks.extraInfo.info,
					'uni-calendar-item--isDay-text':weeks.isDay,
					'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable':weeks.disable,
					}">{{weeks.extraInfo.info}}</text>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		attached() {
			console.log(this.weeks, this.calendar)
		},
		methods: {
			choiceDate(weeks) {
				this.$emit('change', weeks)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-calendar-item__weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.uni-calendar-item__weeks-box-text {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.uni-calendar-item__weeks-lunar-text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}

	.uni-calendar-item__weeks-box-item {
		width: 100%;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 70rpx;
	}
	
	// .uni-calendar-item__weeks-box-item--isDay {
	// 	width: 70rpx;
	// 	border-radius: 100%;
	// 	border: 2rpx solid $color-warning;
	// 	color: $color-warning;
	// }
	
	.uni-calendar-item__weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: $uni-color-error;
	}
	
	.uni-calendar-item__weeks-box-selected {
		width: 100%;
		height: 100%;
		background-color: $color-warning;
		color: #FFFFFF !important;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.8;
	}

	.uni-calendar-item--disable {
		background-color: rgba(249, 249, 249, $uni-opacity-disabled);
		color: $uni-text-color-disable;
	}

	.uni-calendar-item--isDay-text {
		color: $color-warning;
	}

	.uni-calendar-item--isDay {
		// opacity: 0.8;
		color: $color-warning;
	}

	.uni-calendar-item--extra {
		color: $uni-color-error;
		opacity: 0.8;
	}

	.uni-calendar-item--checked {
		background-color: $color-warning;
		color: #fff;
		opacity: 0.8;
		border-radius: 50rem !important;
	}
	
	.uni-calendar-item__weeks-box-item--isDay {
		
	}
	
	.uni-calendar-item--multiple {
		background-color: $uni-color-primary;
		color: #fff;
		opacity: 0.8;
	}
</style>
