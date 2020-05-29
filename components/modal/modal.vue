<template>
	<view @touchmove.stop.prevent>
		<view class="modal-box" :style="{width:width,padding:padding,borderRadius:radius}" :class="[(fadein || show)?'modal-normal':'modal-scale',show?'modal-show':'']">
			<view v-if="custom">
				<slot></slot>
			</view>
			<view v-else>
				<view class="modal-title" v-if="title">{{title}}</view>
				<view class="modal-content" :class="[title?'':'mtop']" :style="{color:color,fontSize:size+'rpx'}">
					<slot></slot>
				</view>
				<view class="modalBtn-box" :class="[button.length!=2?'flex-column':'']">
					<block v-for="(item,index) in button" :key="index">
						<button class="modal-btn" 
								:class="[
										''+(item.type || 'primary')+(item.plain?'-outline':''),
										button.length!=2?'btn-width':'',
										button.length>2?'mbtm':'',
										shape=='circle'?'circle-btn':'',
										'btn-' + (item.size || 'default'),										
									]"
								:hover-class="''+(item.plain?'outline':(item.type || 'primary'))+'-hover'" :data-index="index" @tap="handleClick">{{item.text || "确定"}}</button>
					</block>
				</view>
			</view>
		</view>
		<view class="modal-mask" :class="[show?'mask-show':'']" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
	export default {
		name: "Modal",
		props: {
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			//自定义modal体
			custom: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: "84%"
			},
			padding: {
				type: String,
				default: "40rpx"
			},
			radius: {
				type: String,
				default: "24rpx"
			},
			//标题
			title: {
				type: String,
				default: ""
			},
			//内容
			content: {
				type: String,
				default: ""
			},
			//内容字体颜色
			color: {
				type: String,
				default: "#999"
			},
			//内容字体大小 rpx
			size: {
				type: Number,
				default: 28
			},
			//形状 circle, square
			shape: {
				type: String,
				default: 'square'
			},
			button: {
				type: Array,
				default: function() {
					return [{
						text: "取消",
						type: "red",
						plain: true //是否空心
					}, {
						text: "确定",
						type: "red",
						plain: false
					}]
				}
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			//淡入效果，自定义弹框插入input输入框时传true
			fadein: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleClick(e) {
				if (!this.show) return;
				const dataset = e.currentTarget.dataset;
				this.$emit('click', {
					index: Number(dataset.index)
				});
			},
			handleClickCancel() {
				if (!this.maskClosable) return;
				this.$emit('cancel');
			}
		}
	}
</script>

<style lang="scss">
	.modal-box {
		position: fixed;
		left: 50%;
		top: 50%;
		margin: auto;
		background: #fff;
		z-index: 9999998;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		box-sizing: border-box;
		visibility: hidden;
	}

	.modal-scale {
		transform: translate(-50%, -50%) scale(0);
	}

	.modal-normal {
		transform: translate(-50%, -50%) scale(1);
	}

	.modal-show {
		opacity: 1;
		visibility: visible;
	}

	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.mask-show {
		visibility: visible;
		opacity: 1;
	}

	.modal-title {
		text-align: center;
		font-size: 34rpx;
		color: #333;
		padding-top: 20rpx;
		font-weight: bold;
	}

	.modal-content {
		color: #999;
		font-size: 28rpx;
		padding-top: 20rpx;
		padding-bottom: 60rpx;
	}

	.mtop {
		margin-top: 30rpx;
	}

	.mbtm {
		margin-bottom: 30rpx;
	}

	.modalBtn-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	.flex-column {
		flex-direction: column;
	}

	.modal-btn {
		width: 46%;
		height: 68rpx;
		line-height: 68rpx;
		position: relative;
		border-radius: 60rpx;
		font-size: 28rpx;
		overflow: visible;
		margin-left: 0;
		margin-right: 0;
		
		&.btn-default {
			font-size: 28rpx;
		}
		
		&.btn-lg {
			font-size: 32rpx;
		}
		
		&.btn-sm {
			font-size: 24rpx;
		}
	}

	.modal-btn::after {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		left: 0;
		top: 0;
		border-radius: 60rpx;
	}

	.btn-width {
		width: 80% !important;
	}

	.primary {
		background: #97AF13;
		color: #fff;
	}

	.primary-hover {
		background: #97AF13;
		color: #e5e5e5;
	}

	.primary-outline {
		color: #97AF13;
		background: none;
	}

	.primary-outline::after {
		border: 1px solid #97AF13;
	}

	.danger {
		background: #ed3f14;
		color: #fff;
	}

	.danger-hover {
		background: #d53912;
		color: #e5e5e5;
	}

	.danger-outline {
		color: #ed3f14;
		background: none;
	}

	.danger-outline::after {
		border: 1px solid #ed3f14;
	}

	.red {
		background: #e41f19;
		color: #fff;
	}

	.red-hover {
		background: #c51a15;
		color: #e5e5e5;
	}

	.red-outline {
		color: #e41f19;
		background: none;
	}

	.red-outline::after {
		border: 1px solid #e41f19;
	}

	.warning {
		background: #ff7900;
		color: #fff;
	}

	.warning-hover {
		background: #e56d00;
		color: #e5e5e5;
	}

	.warning-outline {
		color: #ff7900;
		background: none;
	}

	.warning-outline::after {
		border: 1px solid #ff7900;
	}

	.green {
		background: #19be6b;
		color: #fff;
	}

	.green-hover {
		background: #16ab60;
		color: #e5e5e5;
	}

	.green-outline {
		color: #19be6b;
		background: none;
	}

	.green-outline::after {
		border: 1px solid #19be6b;
	}

	.white {
		background: #fff;
		color: #333;
	}

	.white-hover {
		background: #f7f7f9;
		color: #666;
	}

	.white-outline {
		color: #333;
		background: none;
	}

	.white-outline::after {
		border: 1px solid #333;
	}

	.gray {
		background: #ededed;
		color: #999;
	}

	.gray-hover {
		background: #d5d5d5;
		color: #898989;
	}

	.gray-outline {
		color: #999;
		background: none;
	}

	.gray-outline::after {
		border: 1px solid #999;
	}

	.outline-hover {
		opacity: 0.6;
	}

	.circle-btn {
		border-radius: 40rpx !important;
	}

	.circle-btn::after {
		border-radius: 80rpx !important;
	}
</style>
