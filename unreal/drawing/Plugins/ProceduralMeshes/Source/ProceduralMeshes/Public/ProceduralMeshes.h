// Copyright 2016, Sigurdur Gunnarsson. All Rights Reserved. 

#pragma once

#include "Engine.h"
#include "ModuleManager.h"

class FProceduralMeshesModule : public IModuleInterface
{
public:

	/** IModuleInterface implementation */
	virtual void StartupModule() override;
	virtual void ShutdownModule() override;
};