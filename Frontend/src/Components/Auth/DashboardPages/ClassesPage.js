import React, {useEffect, useState} from "react";
import Popup from "../../Layout/Popup";
import ClassesCard from "../Classes/ClassesCard";
import AddClassForm from "../Classes/AddClassForm";
import EditClassForm from "../Classes/EditClassForm";
import DeleteClassForm from "../Classes/DeleteClassForm";
import ClassViewForm from "../Classes/ClassViewForm";

const ClassesPage = ({fetchClasses, loadingClasses, classes}) => {
    const [reloadClass, setReloadClass] = useState(false);
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    const [showEditClassForm, setShowEditClassForm] = useState(false);
    const [showDeleteClassForm, setShowDeleteClassForm] = useState(false);
    const [showViewClassForm, setShowViewClassForm] = useState(false);
    const [editClass, setEditClass] = useState("");
    const [deleteClass, setDeleteClass] = useState("");
    const [viewClass, setViewClass] = useState("");

    const showAddClassFormPopup = () => {
        setShowAddClassForm(true);
    };
    const showEditClassFormPopup = (classes) => {
        setEditClass(classes);
        setShowEditClassForm(true);
    };
    const showDeleteClassFormPopup = (classes) => {
        setDeleteClass(classes);
        setShowDeleteClassForm(true);
    };
    const showViewClassFormPopup = (classes) => {
        setViewClass(classes);
        setShowViewClassForm(true);
    };

    useEffect(() => {
        fetchClasses();
    }, [reloadClass]);

    // console.log(classes)

    return (
        <>
            <ClassesCard
                fetchClasses={fetchClasses}
                loadingClasses={loadingClasses}
                classes={classes}
                showAddClassFormPopup={showAddClassFormPopup}
                showEditClassFormPopup={showEditClassFormPopup}
                showDeleteClassFormPopup={showDeleteClassFormPopup}
                showViewClassFormPopup={showViewClassFormPopup}
            />
            {/*Class Add Form Popup*/}
            {showAddClassForm && (
                <Popup
                    show={showAddClassForm}
                    setShow={setShowAddClassForm}
                    title=""
                    content={
                        <AddClassForm
                            setReloadClass={setReloadClass}
                            reloadClass={reloadClass}
                        />
                    }
                />
            )}
            {/*Class Edit Form Popup*/}
            {showEditClassForm && (
                <Popup
                    show={showEditClassForm}
                    setShow={setShowEditClassForm}
                    title=""
                    content={
                        <EditClassForm
                            setReloadClass={setReloadClass}
                            editClass={editClass}
                            reloadClass={reloadClass}
                        />
                    }
                />
            )}
            {/*Class Delete Form Popup*/}
            {showDeleteClassForm && (
                <Popup
                    show={showDeleteClassForm}
                    setShow={setShowDeleteClassForm}
                    title=""
                    content={
                        <DeleteClassForm
                            setReloadClass={setReloadClass}
                            deleteClass={deleteClass}
                            reloadClass={reloadClass}
                        />
                    }
                />
            )}
            {/*Class View Form Popup*/}
            {showViewClassForm && (
                <Popup
                    show={showViewClassForm}
                    setShow={setShowViewClassForm}
                    title=""
                    content={<ClassViewForm classes={classes} fetch viewClass={viewClass}/>}
                />
            )}
            `
            {/*<ClassesItems*/}
            {/*    fetchClasses={fetchClasses}*/}
            {/*    loadingClasses={loadingClasses}*/}
            {/*    classes={classes}*/}
            {/*    showAddClassFormPopup={showAddClassFormPopup}*/}
            {/*    showEditClassFormPopup={showEditClassFormPopup}*/}
            {/*    showDeleteClassFormPopup={showDeleteClassFormPopup}*/}
            {/*/>*/}
            {/*/!*  Classes Add Form Popup*!/*/}
            {/*{showAddClassForm && (<Popup*/}
            {/*    show={showAddClassForm}*/}
            {/*    setShow={setShowAddClassForm}*/}
            {/*    title=""*/}
            {/*    content={<AddClassForm*/}
            {/*        setReloadClass={setReloadClass}*/}
            {/*        reloadClass={reloadClass}*/}
            {/*    />}*/}
            {/*/>)}*/}
            {/*/!*  Classes Edit Form Popup*!/*/}
            {/*{showEditClassForm && (<Popup*/}
            {/*    show={showEditClassForm}*/}
            {/*    setShow={setShowEditClassForm}*/}
            {/*    title=""*/}
            {/*    content={<EditClassForm*/}
            {/*        setReloadClass={setReloadClass}*/}
            {/*        editClass={editClass}*/}
            {/*        reloadClass={reloadClass}*/}
            {/*    />}*/}
            {/*/>)}*/}
            {/*/!*Classes Delete Form Popup*!/*/}
            {/*{showDeleteClassForm && (<Popup*/}
            {/*    show={showDeleteClassForm}*/}
            {/*    setShow={setShowDeleteClassForm}*/}
            {/*    title=""*/}
            {/*    content={<DeleteClassForm*/}
            {/*        setReloadClass={setReloadClass}*/}
            {/*        deleteClass={deleteClass}*/}
            {/*        reloadClass={reloadClass}*/}
            {/*    />}*/}
            {/*/>)}*/}
        </>
    );
};

export default ClassesPage;
