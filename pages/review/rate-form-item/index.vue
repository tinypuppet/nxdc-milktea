<template>
	<list-cell :hover="false" last class="w-100 d-flex align-items-baseline">
		<view class="font-size-extra-lg text-color-primary mr-40">{{ label }}</view>
		<view class="flex-fill d-flex flex-column">
			<view class="d-flex align-items-center mb-20">
				<view class="iconfont score" v-for="(item, index) in 5" :key="index" @tap="handleScoreClick(index)"
					  :class="[value > index ? 'iconshoucangfill' : 'iconshoucang']"
					  :style="{opacity: (value <= index) || !value ? 1 : value / 5 + 0.1}">
				</view>
			</view>
			<view class="font-size-base text-color-base">{{ tips }}</view>
		</view>
	</list-cell>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	
	export default {
		name: 'rateFormItem',
		components: {
			listCell
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			label: {
				type: String,
				default: ''
			},
			tips: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		methods: {
			handleScoreClick(index) {
				this.$emit('input', index + 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.score {
		font-size: 56rpx;
		color: #ccc;
		margin-right: 20rpx;
		
		&.iconshoucangfill {
			color: $color-warning;
		}
	}
</style>
