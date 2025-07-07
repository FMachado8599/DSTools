import { useState, useEffect } from "react";
import defaultLayouts from "@/config/defaultLayouts";
import { STORAGE_KEYS } from "@/config/localKeys";

export const useLayoutManager = () => {
  const [editMode, setEditMode] = useState(false);
  const [layouts, setLayouts] = useState(null);
  const [hasLoadedLayout, setHasLoadedLayout] = useState(false);
  const [renderedComponents, setRenderedComponents] = useState(["colors", "shades", "qr"]);
  const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
    const savedLayouts = localStorage.getItem(STORAGE_KEYS.DASHBOARD_LAYOUT);
    if (savedLayouts) {
        try {
        setLayouts(JSON.parse(savedLayouts));
        } catch (e) {
        console.error("Error parsing saved layout:", e);
        setLayouts(defaultLayouts);
        }
    } else {
        setLayouts(defaultLayouts);
    }
    setHasLoadedLayout(true); // ✅ ¡esto tiene que estar afuera del if!
    }, []);

    const handleToggleEdit = () => {
        const nextEditMode = !editMode;
        setEditMode(nextEditMode);

        if (editMode && layouts) {
        localStorage.setItem(STORAGE_KEYS.DASHBOARD_LAYOUT, JSON.stringify(layouts));
        }
    };

    const handleAddComponent = (key) => {
        if (renderedComponents.includes(key)) return;

        setRenderedComponents((prev) => [...prev, key]);
        setLayouts((prevLayouts) => {
        const newLayouts = { ...prevLayouts };

        for (const bp in newLayouts) {
            if (!newLayouts[bp]) newLayouts[bp] = [];

            const exists = newLayouts[bp].some((item) => item.i === key);
            if (exists) continue;

            const defaultLayout = defaultLayouts[bp]?.find((item) => item.i === key);
            if (defaultLayout) {
            newLayouts[bp].push({ ...defaultLayout });
            } else {
            console.warn(`No default layout for "${key}" at breakpoint "${bp}"`);
            }
        }

        return newLayouts;
        });
    };

    const handleRemove = (key) => {
        setRenderedComponents((prev) => prev.filter((compKey) => compKey !== key));

        setLayouts((prevLayouts) => {
        if (!prevLayouts) return prevLayouts;

        const newLayouts = { ...prevLayouts };
        for (const bp in newLayouts) {
            newLayouts[bp] = newLayouts[bp].filter((item) => item.i !== key);
        }
        return newLayouts;
        });
    };

    const handleLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };

    const openAddModal = () => {
        setEditMode(true);
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const addComponentAndCloseModal = (key) => {
        handleAddComponent(key);
        closeAddModal();
    };

    return {
    editMode,
    showAddModal,
    renderedComponents,
    layouts,
    handleLayoutChange,
    handleRemove,
    handleToggleEdit,
    openAddModal,
    closeAddModal,
    addComponentAndCloseModal,
    hasLoadedLayout
    };
};
