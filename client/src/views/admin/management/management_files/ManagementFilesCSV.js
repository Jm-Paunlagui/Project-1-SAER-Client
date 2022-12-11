import React, { useState, useEffect } from "react";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON, STATUS_GREEN, STATUS_RED, STATUS_WARNING,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faFileCsv,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../../http/httpClient";
import LoadingPage from "../../../../components/loading/LoadingPage";
import { toast } from "react-toastify";
import DangerConfirmModal from "../../../../components/modal/DangerConfirmModal";
import { Link } from "react-router-dom";
import { Header } from "../../../../components/headers/Header";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import Paginator from "../../../../components/paginator/Paginator";
import {NoData} from "../../../../components/warnings/WarningMessages";

/**
 * @description Handles the files to view and delete
 */
export default function ManagementFilesCSV() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const [fileData, setFileData] = useState({
    loading: true,
    files_list: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
    per_page_limit: per_page[0].value,
  });

  const {
    loading,
    files_list,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = fileData;

  const [filteredListOfFiles, setFilteredListOfFiles] = useState(files_list);

  const handleSelect = (name) => (value) => {
    setFileData({
      ...fileData,
      [name]: value,
    });
  };

  const [loadingAnimation, setLoadingAnimation] = useState({
    massRestore: false,
    textChangeRestore: "Restore all",
    massDelete: false,
    textChangeDelete: "Delete all",
  });

  const { massRestore, textChangeRestore, massDelete, textChangeDelete } =
    loadingAnimation;

  /**
   * @description Filters the list of files based on the search value
   * @param event
   */
  const handleSearchForFile = (event) => {
    const searchValue = event.target.value;
    const filteredList = files_list.filter((file) => {
      return (
        file.school_year.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.school_semester
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        file.csv_question.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfFiles(filteredList);
  };

  /**
   * @description Loads the files from the backend
   * @param page
   * @param per_page_limit
   */
  const loadFiles = (page, per_page_limit) => {
    setFileData({
      ...fileData,
      loading: true,
    });
    httpClient
      .get(`/data/list-of-csv-files-to-view/${page}/${per_page_limit}`)
      .then((response) => {
        setFileData({
          ...fileData,
          loading: false,
          files: response.data.csv_files,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredListOfFiles(response.data.csv_files);
      });
  };

  useEffect(() => {
    loadFiles(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  /**
   * @description Handles the delete of a file from the backend
   * @param file
   */
  const handleDelete = (file) => {
    httpClient
      .delete(`/data/delete-csv-file/${file}`)
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  /**
   * @description Handles the download of a file from the backend
   * @param file
   */
  const handleDownload = (file) => {
    httpClient
      .get(`/data/download-csv-file/${file}`, { responseType: "blob" })
      .then((response) => {
        const filename =
          response.headers["content-disposition"].split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl mt-8">
      <Header
        body={
          "View and Delete files CSV files that have been analyzed by the system."
        }
        title={"File Management"}
      />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForFile(event)}
            placeholder="Search"
            type="text"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="w-full bg-blue-50 rounded-lg shadow-md p-4 mt-8">
              <div className="content-end flex flex-wrap justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Number of records per page
                  </h1>
                </div>
                <Paginator
                  handleSelect={handleSelect}
                  per_page={per_page}
                  per_page_limit={per_page_limit}
                />
              </div>
            </div>
            <div className="w-full bg-blue-50 rounded-lg shadow-md p-4 mt-8">
              <div className="content-end flex flex-wrap justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Danger Actions
                  </h1>
                </div>

                <DangerConfirmModal
                  body={`Are you sure you want to restore all users account to the system?`}
                  description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                  is_Mass
                  is_danger
                  is_loading={massRestore}
                  // onConfirm={() => handleRestoreAllUsers()}
                  textChange={textChangeRestore}
                  title="Restore Account"
                  type_of_modal="restore"
                />

                <DangerConfirmModal
                  body={`Are you sure you want to temporarily delete all users account to the system?`}
                  description="This action cannot be undone. This will temporarily delete the users account from the system."
                  is_Mass
                  is_danger
                  is_loading={massDelete}
                  // onConfirm={() => handleDeleteAllUsers()}
                  textChange={textChangeDelete}
                  title="Delete User Confirmation"
                  type_of_modal="delete"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-4">
            <h1 className="text-start font-medium text-blue-500">
              Page {current_page} of {total_pages}
            </h1>
          </div>
          {filteredListOfFiles.length > 0 ? (
            <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
              {filteredListOfFiles.map((file) => (
                <div
                  className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
                  key={file.id}
                >
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full p-4">
                      <h1 className="text-md font-bold leading-none text-blue-600">
                        File ID
                      </h1>
                      <h1 className="text-md leading-none text-gray-500 ml-2">
                        {file.id}
                      </h1>
                    </div>
                  </div>
                  <hr className="w-full border-gray-300" />
                  <div className="col-span-4 text-start p-4">
                    <div className="flex flex-row w-full py-2">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Status
                      </h1>
                    </div>
                    <div className="content-end flex flex-wrap justify-start w-full gap-2">
                      <div
                          className={`p-2 flex flex-row justify-center ${
                              file.flag_deleted ? STATUS_RED : STATUS_GREEN
                          }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {file.flag_deleted ? "Deleted" : "Available"}
                        </h1>
                      </div>
                      <div
                          className={`p-2 flex flex-row justify-center ${
                              file.flag_release ? STATUS_GREEN : STATUS_WARNING
                          }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {file.flag_release ? "Released" : "Unreleased"}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-row w-full py-2">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Details
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        School Year:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {file.school_year}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        School Semester:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {file.school_semester}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        Topic:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {file.csv_question}
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Actions
                      </h1>
                    </div>
                    <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                      <button
                        className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                        type="button"
                      >
                        <Link to={`${file.id}`}>
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faFileCsv}
                          />
                          View
                        </Link>
                      </button>
                      <button
                        className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                        onClick={() => handleDownload(file.id)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faFileArrowDown}
                        />
                        Download
                      </button>
                      <DangerConfirmModal
                        body={`Are you sure you want to delete ${file.csv_question} with a school year of ${file.school_year} and a school semester of ${file.school_semester}?`}
                        description="This action cannot be undone. This will permanently delete the file and its associated data from the system."
                        id={file.id}
                        is_Mass={false}
                        is_danger
                        onConfirm={handleDelete}
                        title="Delete File Confirmation"
                        type_of_modal="delete"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={"pb-8"}>
              <NoData
                message="Data Unavailable"
              />
            </div>
          )}
          <div className="pb-16 flex flex-col space-y-2 justify-end w-full lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
              {/*    Page details*/}
              <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-base font-medium leading-none t text-blue-500">
                  Showing {files_list.length} of {total_items} files in total (
                  {total_pages} pages)
                </h1>
              </div>
            </div>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_prev ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_prev}
              onClick={() =>
                setFileData({ ...fileData, page_number: page_number - 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretLeft}
              />
              Newer
            </button>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_next ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_next}
              onClick={() =>
                setFileData({ ...fileData, page_number: page_number + 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretRight}
              />
              Older
            </button>
          </div>
        </>
      )}
    </div>
  );
}
