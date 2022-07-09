<script setup lang="ts">
	import {
		DataTableColumns,
		NButton,
		NSpace,
		NSwitch,
		NSelect,
		useNotification,
		SelectOption,
	} from "naive-ui";
	import { Class } from "../../../../composables/User/public";
	import { AddCircleOutline, FlashOutline, RefreshCircleOutline } from "@vicons/ionicons5";
	import { paths } from "../../../../composables/User/path";
	import {
		getSourceDetail,
		ChangeClassGet,
		DistributeClass,
	} from "../../../../composables/User/api";
	import { CategoryList } from "../../../../composables/User/data";

	const route = useRoute(); // 路由
	const notification = useNotification(); // 通知

	paths.value = [
		{
			name: "采集源",
			params: null,
			to: "",
		},
		{
			name: "采集类",
			params: null,
			to: "",
		},
	];
	const data = ref<Class[]>([]);

	getSourceDetail(Number(route.params.id), data);

	const columns = ref<DataTableColumns<Class>>([
		{
			title: "ID",
			key: "id",
			width: 100,
			align: "center",
		},
		{
			title: "名字",
			key: "name",
			align: "center",
		},
		{
			title: "是否采集",
			key: "get",
			width: 200,
			align: "center",
			render(row: Class, index: number) {
				return h(NSwitch, {
					value: row.get,
					onUpdateValue: (value: boolean) => {
						ChangeClassGet(row.id, value).then(() => {
							row.get = value;
						});
					},
				});
			},
		},
		{
			title: "所属分类",
			key: "categoryId",
			width: 200,
			align: "center",
			render(row: Class, index: number) {
				return h(NSelect, {
					value: row.categoryId,
					options: CategoryList.value,
					onUpdateValue: (value: number, option: SelectOption) => {
						DistributeClass(row.id, value).then(() => {
							row.categoryId = value;
							notification["success"]({
								duration: 1500,
								content: "分配采集类",
								meta: "操作成功",
							});
						});
					},
				});
			},
		},
		{
			title: "操作",
			key: "action",
			width: "150px",
			align: "center",
			render(row: Class, index: number) {
				return h(
					NSpace,
					{
						justify: "center",
					},

					() =>
						h(
							NButton,
							{
								secondary: true,
								type: "error",
								size: "small",
								disabled: true,
								onClick: () => {
									// DelMovie(row.id).then(() => {
									// 	refresh();
									// 	notification["success"]({
									// 		duration: 2000,
									// 		content: "删除",
									// 		meta: "操作成功",
									// 	});
									// });
								},
							},
							() => "删除"
						)
				);
			},
		},
	]);
</script>

<template>
	<n-card title="分类管理" size="small">
		<template #header-extra>
			<n-space>
				<n-input placeholder="搜索" round disabled>
					<template #prefix>
						<n-icon :component="FlashOutline" />
					</template>
				</n-input>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="primary" style="font-size: 24px" disabled>
						<n-icon>
							<add-circle-outline />
						</n-icon>
					</n-button>
				</div>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="info" style="font-size: 24px">
						<n-icon>
							<refresh-circle-outline />
						</n-icon>
					</n-button>
				</div>
			</n-space>
		</template>
		<n-data-table :columns="columns" :data="data" :bordered="false" :single-line="false" />
	</n-card>
</template>

<style></style>
