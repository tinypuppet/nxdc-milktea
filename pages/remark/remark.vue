<template>
	<view class="container w-100 h-100 overflow-hidden">
		<view class="textarea">
			<textarea placeholder-class="text-color-assist font-size-base" v-model="remark"
				class="bg-white w-100 border-box font-size-base remark"
				:class="{'text-color-danger': remarkLength > 50, 'text-color-assist' : remarkLength <=50}"
				placeholder="请填写备注信息" focus/>
			<view class="tips" :class="{'text-color-danger': remarkLength > 50, 'text-color-assist' : remarkLength <=50}">
				{{ remarkLength }}/50
			</view>
		</view>
		<view class="d-flex font-size-base text-color-assist" style="margin: 40rpx 0;">
			快捷输入
		</view>
		<view class="quick-inputs d-flex flex-wrap justify-content-start">
			<view class="quick-input" v-for="(item, index) in quickInputs" :key="index" @tap="handleQuickInput(item)">
				{{ item }}
			</view>
		</view>
		<view class="d-flex just-content-center align-items-center" style="margin-top: 60rpx;">
			<button type="primary" class="submit-btn font-size-base" @tap="submit">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remark: '',
				quickInputs: [
					'请放门把手上', '请放门口', '请放前台桌上', '如地址封闭管理，请电话与我联系'
				]
			}
		},
		onLoad({remark}) {
			this.remark = remark
		},
		computed: {
			remarkLength() {
				return this.remark.length
			},
			isDanger() {
				return this.remark.length > 50
			}
		},
		methods: {
			handleQuickInput(item) {
				this.remark = this.remark.concat(" ", item)
			},
			submit() {
				uni.navigateTo({
					url: "/pages/pay/pay?remark=" + this.remark
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx 40rpx;
		
		.textarea {
			position: relative;
			
			.remark {
				border-radius: 8rpx;
				padding: 30rpx 40rpx;
				height: 320rpx;
				color: $font-size-base;
			}
			
			.tips {
				position: absolute;
				bottom: 30rpx;
				right: 40rpx;
			}
		}
		
		.quick-inputs {
			padding-right: 20rpx;
			
			.quick-input {
				background-color: #FFFFFF;
				border: 2rpx solid $color-primary;
				color: $color-primary;
				font-size: $font-size-base;
				padding: 16rpx 26rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
		
		.submit-btn {
			width: 90%;
			height: 80rpx;
			border-radius: 40rpx;
			line-height: 80rpx;
		}
	}
</style>
