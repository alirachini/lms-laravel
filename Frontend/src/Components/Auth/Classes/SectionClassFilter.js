import React from 'react';

const SectionClassFilter = ({classes, selectedSectionClass, setSelectedSectionClass}) => {

    //on Change

    // console.log(classes)

    return (
        <div className="form-group">
            <select
                value={selectedSectionClass}
                name="classes"
                onChange={(e) => {
                    setSelectedSectionClass(e.target.value)
                }}
            >
                {classes.map((classes) =>
                    <option key={classes.id} value={classes.id}>
                        {classes.ClassName}
                    </option>
                )}
            </select>
        </div>
    );
};

export default SectionClassFilter;
