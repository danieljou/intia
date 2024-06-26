/** @format */

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
	useDeleteSurcusalleMutation,
	useGetSuccursaleQuery,
} from "../store/api/MainApi";
import { Succursale as SS } from "../interfaces/mainInterfaces";
import { Dialog, IconButton } from "@mui/material";
import { CgClose, CgEye, CgSpinner } from "react-icons/cg";
import Surcusale from "../components/SuccusaleForm";
import { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
const Succursale = () => {
	const { data, isSuccess, isLoading, refetch } = useGetSuccursaleQuery();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [Delete] = useDeleteSurcusalleMutation();

	const columns: GridColDef<SS[number]>[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "nom",
			headerName: "Non",
			width: 150,
		},
		{
			field: "adresse",
			headerName: "adresse",
			width: 150,
		},
		{
			field: "responsable",
			headerName: "Responsable",
			type: "number",
			width: 110,
		},
		{
			field: "telephone",
			headerName: "Télephone",
			type: "number",
			width: 180,
		},
		{
			field: "email",
			headerName: "Email",
			type: "number",
			width: 200,
		},

		{
			field: "Action",
			width: 200,
			renderCell: (row) => {
				const id = row.id;
				return (
					<div className="flex gap-4 pr-4">
						<IconButton>
							<CgEye />
						</IconButton>
						<IconButton
							onClick={() => {
								Delete(id as unknown as number);
								refetch();
							}}>
							<BiTrash />
						</IconButton>
						<IconButton>
							<BiPencil />
						</IconButton>
					</div>
				);
			},
		},
	];
	return (
		<div>
			<div className="flex justify-end  ">
				<button
					onClick={() => setIsOpen(true)}
					className="px-4 py-2 bg-blue-500 text-white">
					Ajouter
				</button>
			</div>
			<Dialog open={isOpen} fullWidth>
				<div className="p-4">
					<div className="flex justify-end">
						<IconButton onClick={() => setIsOpen(false)}>
							<CgClose />
						</IconButton>
					</div>
					<div className="w-full">
						<Surcusale />
					</div>
				</div>
			</Dialog>
			{isLoading && (
				<div className="flex justify-center animate-spin">
					{" "}
					<CgSpinner size={100} />{" "}
				</div>
			)}
			<div className="text-2xl font-bold my-5">Succursales</div>

			<div className="my-5">
				{isSuccess && (
					<DataGrid
						rows={data ? data : []}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				)}
			</div>
		</div>
	);
};

export default Succursale;
