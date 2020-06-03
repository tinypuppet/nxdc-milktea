<template>
	<view class="container">
		<view class="invoice-box-1">
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex">
					<view class="label">发票类型</view>
					<view class="flex-fill d-flex flex-column">
						<view>电子普通发票</view>
						<view style="font-size: 20rpx">电子发票与纸质普通发票具备同等法律效益，可支持报销入账</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex">
					<view class="label">发票内容</view>
					<view class="flex-fill">食品</view>
				</view>
			</list-cell>
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex">
					<view class="label">发票抬头</view>
					<view class="flex">
						<view class="radio-group">
							<view class="radio mr-20" :class="{'checked': !form.taitou}" @tap="form.taitou=0">个人</view>
							<view class="radio" :class="{'checked': form.taitou}" @tap="form.taitou=1">公司</view>
						</view>
					</view>
				</view>
			</list-cell>
		</view>
		
		<view class="invoice-box-2">
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex w-100">
					<view class="label">姓名</view>
					<view class="flex-fill d-flex">
						<input class="flex-fill mr-20" type="text" v-model="form.username" placeholder="请输入姓名" placeholder-class="font-size-sm text-color-assist">
						<view class="text-color-danger">必填</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex w-100">
					<view class="label">邮箱地址</view>
					<view class="flex-fill d-flex">
						<input class="flex-fill mr-20" type="text" v-model="form.email" placeholder="请输入邮箱地址" placeholder-class="font-size-sm text-color-assist">
						<view class="text-color-danger">必填</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false" line-left line-right>
				<view class="d-flex w-100">
					<view class="label">手机号</view>
					<view class="flex-fill d-flex">
						<input class="flex-fill mr-20" type="text" v-model="form.telphone" placeholder="请输入手机号码" placeholder-class="font-size-sm text-color-assist">
						<view class="text-color-danger">必填</view>
					</view>
				</view>
			</list-cell>
		</view>
		
		<view class="btn-box">
			<view class="item"><button type="primary" plain>导入发票抬头</button></view>
			<view class="item"><button type="primary">提交</button></view>
		</view>
	</view>
</template>

<script>
	import listCell from '../../components/list-cell/list-cell.vue'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				form: {
					taitou: 0,
					username: '',
					email: '',
					telphone: ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10rpx 20rpx;
	}
	
	.invoice-box-1, .invoice-box-2 {
		background-color: #FFFFFF;
		font-size: $font-size-sm;
		border-radius: 12rpx;
	}
	
	.invoice-box-1 {
		margin-bottom: 10rpx;
	}
	
	.radio-group {
		display: flex;
		justify-content: flex-start;
		
		.radio {
			padding: 10rpx 30rpx;
			border-radius: 6rpx;
			border: 2rpx solid $text-color-assist;
			color: $text-color-assist;
			font-size: $font-size-base;
			
			&.checked {
				background-color: $color-primary;
				color: $text-color-white;
				border: 2rpx solid $color-primary;
			}
		}
	}
	
	.label {
		width: 150rpx;
		color: $text-color-assist;
	}
	
	.btn-box {
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120rpx;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		z-index: 11;
		
		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 10rpx;
			flex: 1;
			flex-shrink: 0;
			
			button {
				width: 100%;
				border-radius: 50rem !important;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0;
			}
		}
	}
</style>
