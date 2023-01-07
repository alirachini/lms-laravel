import React, {useEffect, useState} from "react";
import Popup from "../../Layout/Popup";
import AddSectionForm from "../Sections/AddSectionForm";
import SectionsCard from "../Sections/SectionsCard";
import SectionViewForm from "../Sections/SectionViewForm";
import DeleteSectionForm from "../Sections/DeleteSectionForm";
import EditSectionForm from "../Sections/EditSectionForm";

const SectionsPage = ({
                          classes,
                          sections,
                          fetchSections,
                          sectionCount,
                          loadingSections,
                          fetchSectionsByClass,
                          loadingSectionByClass,
                          sectionByClass,
                          fetchClasses


                      }) => {

    const [reloadSection, setReloadSection] = useState(false);
    const [showAddSectionForm, setShowAddSectionForm] = useState(false);
    const [showEditSectionForm, setShowEditSectionForm] = useState(false);
    const [showDeleteSectionForm, setShowDeleteSectionForm] = useState(false);
    const [showViewSectionForm, setShowViewSectionForm] = useState(false);
    const [editSection, setEditSection] = useState("");
    const [deleteSection, setDeleteSection] = useState("");
    const [viewSection, setViewSection] = useState("");
    const [selectedSectionClass, setSelectedSectionClass] = useState(1);

    const showAddSectionFormPopup = () => {
        setShowAddSectionForm(true);
    };
    const showEditSectionFormPopup = (sections) => {
        setEditSection(sections);
        setShowEditSectionForm(true);
    };
    const showDeleteSectionFormPopup = (sections) => {
        setDeleteSection(sections);
        setShowDeleteSectionForm(true);
    };
    const showViewSectionFormPopup = (sections) => {
        setViewSection(sections);
        setShowViewSectionForm(true);
    };

    useEffect(() => {
        fetchSections();
    }, [reloadSection]);
    return (
        <>
            <SectionsCard
                classes={classes}
                sections={sections}
                sectionCount={sectionCount}
                loadingSections={loadingSections}
                fetchSectionsByClass={fetchSectionsByClass}
                loadingSectionByClass={loadingSectionByClass}
                sectionByClass={sectionByClass}
                showAddSectionFormPopup={showAddSectionFormPopup}
                showEditSectionFormPopup={showEditSectionFormPopup}
                showDeleteSectionFormPopup={showDeleteSectionFormPopup}
                showViewSectionFormPopup={showViewSectionFormPopup}
            />
            {/*Section Add Form Popup*/}
            {showAddSectionForm && (
                <Popup
                    show={showAddSectionForm}
                    setShow={setShowAddSectionForm}
                    title=""
                    content={
                        <AddSectionForm
                            fetchClasses={fetchClasses}
                            classes={classes}
                            setReloadSection={setReloadSection}
                            reloadSection={reloadSection}
                            selectedSectionClass={selectedSectionClass}
                            setSelectedSectionClass={setSelectedSectionClass}

                        />

                    }
                />
            )}

            {/*Section View Form Popup*/}
            {showViewSectionForm && (
                <Popup
                    show={showViewSectionForm}
                    setShow={setShowViewSectionForm}
                    title=""
                    content={
                        <SectionViewForm
                            sections={sections}
                            viewSection={viewSection}
                        />
                    }
                />
            )};
            {/*Section Delete Form*/}
            {showDeleteSectionForm && (
                <Popup
                    show={showDeleteSectionForm}
                    setShow={setShowDeleteSectionForm}
                    title=""
                    content={
                        <DeleteSectionForm
                            setReloadSection={setReloadSection}
                            deleteSection={deleteSection}
                            reloadSection={reloadSection}
                        />
                    }
                />
            )};
            {showEditSectionForm && (
                <Popup
                    show={showEditSectionForm}
                    setShow={setShowEditSectionForm}
                    title=""
                    content={
                        <EditSectionForm
                            classes={classes}
                            editSection={editSection}
                            selectedSectionClass={selectedSectionClass}
                            setSelectedSectionClass={setSelectedSectionClass}
                            fetchClasses={fetchClasses}
                            reloadSection={reloadSection}
                            setReloadSection={setReloadSection}
                        />
                    }
                />
            )}
        </>
    );
};

export default SectionsPage;
