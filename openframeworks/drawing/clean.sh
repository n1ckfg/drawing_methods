#!/bin/bash

CDIR=basename "$PWD"

rm -f $CDIR.sln
rm -f $CDIR.vcxproj
rm -f $CDIR.vcxproj.filters
rm -f $CDIR.vcxproj.user
rm -f icon.rc
rm -f Makefile
rm -f addons.make
rm -f config.make
rm -f openFrameworks-Info.plist
rm -f Project.xcconfig

rm -rf .vs
rm -rf bin
rm -rf $CDIR.xcodeproj
rm -rf obj




